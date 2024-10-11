const jwt = require("jsonwebtoken");
const config = require("../config");

const varifyToken = (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) return res.status(401).json({
        message: "access denied! no token provided!"
    });

    try {
        console.log(token.split(" ")[1])
        const decoded = jwt.verify(token.split(" ")[1], config.jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({
            message: "invalid token",
            error: err
        })
    }
}

module.exports = varifyToken;