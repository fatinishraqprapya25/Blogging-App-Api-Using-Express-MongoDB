const { ZodError } = require("zod");
const multer = require("multer");
const sendResponse = require("../utils/sendResponse");

// Custom Error Class (optional but recommended)
class CustomError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

const globalErrorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";
    let errorDetails = {};

    // Handle Zod validation errors
    if (error instanceof ZodError) {
        statusCode = 400;
        message = "Validation failed";
        errorDetails = error.errors.map(err => ({
            path: err.path.join("."),
            message: err.message
        }));
    }

    // Handle Multer file upload errors
    else if (error instanceof multer.MulterError) {
        statusCode = 400;
        message = "File upload error";
        errorDetails = { field: error.field, message: error.message };
    }

    // Handle Custom Errors
    else if (error instanceof CustomError) {
        statusCode = error.statusCode;
        message = error.message;
    }

    // Handle General Errors (unexpected cases)
    else {
        errorDetails = { message: error.message || "Something went wrong" };
    }

    sendResponse(res, statusCode, {
        success: false,
        message,
        error: errorDetails
    });
};

module.exports = { globalErrorHandler, CustomError };
