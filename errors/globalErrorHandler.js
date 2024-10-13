const globalErrorHandler = (error, req, res, next) => {
    res.json({
        status: 500,
        message: error.message,
        error
    });
}

module.exports = globalErrorHandler;