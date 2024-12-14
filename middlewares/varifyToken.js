const checkLoggedIn = require("../utils/checkLoggedIn");
const sendResponse = require("../utils/sendResponse");

const varifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({
        message: "access denied! no token provided!"
    });

    const decoded = checkLoggedIn(req);
    if (decoded) {
        req.user = decoded;
        next();
    } else {
        sendResponse(res, 401, {
            success: false,
            message: "invalid token!"
        });
    }
}

module.exports = varifyToken;