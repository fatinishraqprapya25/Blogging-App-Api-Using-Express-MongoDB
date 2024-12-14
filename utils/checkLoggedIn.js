const jwt = require("jsonwebtoken");
const config = require("../config");

const checkLoggedIn = (req) => {
    const token = req.headers["authorization"];
    if (!token) return false;
    try {
        const decoded = jwt.verify(token.split(" ")[1], config.jwtSecret);
        return decoded;
    } catch (err) {
        return false;
    }
}

module.exports = checkLoggedIn;