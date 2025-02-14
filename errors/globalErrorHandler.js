const { ZodError } = require("zod");
const multer = require("multer");
const sendResponse = require("../utils/sendResponse");

const globalErrorHandler = (error, req, res, next) => {
    let statusCode = error.statusCode || 500;
    let message = error.message || "Internal Server Error";
    let errorDetails = {};

    if (error instanceof ZodError) {
        statusCode = 400;
        message = "Validation failed";
        errorDetails = error.errors.map(err => ({
            path: err.path.join("."),
            message: err.message
        }));
    }

    else if (error instanceof multer.MulterError) {
        statusCode = 400;
        message = "File upload error";
        errorDetails = { field: error.field, message: error.message };
    }

    sendResponse(res, statusCode, {
        success: false,
        message,
        error: errorDetails
    })
};

module.exports = globalErrorHandler;
