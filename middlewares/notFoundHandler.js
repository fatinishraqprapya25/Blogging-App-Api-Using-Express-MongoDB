const notFoundHandler = (req, res, next) => {
    return res.json({
        success: false,
        status: 404,
        message: "Api Route not Found!",
        error: ""
    });
}

module.exports = notFoundHandler;