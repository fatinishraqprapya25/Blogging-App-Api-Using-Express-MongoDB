const Admin = require("../modules/admin/admin.model");
const jwt = require("jsonwebtoken");
const config = require("../config");
const sendResponse = require("../utils/sendResponse");

const varifyAdmin = async (req, res, next) => {
    const token = req.headers["authorization"];
    if (!token) {
        return sendResponse(res, 401, {
            success: false,
            message: "access denied, no token provided"
        });
    }

    try {
        const decoded = jwt.verify(token.split(" ")[1], config.jwtSecret);
        const email = decoded.email;
        const isAdmin = await Admin.findOne({ email });

        if (!isAdmin) {
            const defaultAdminEmail = config.defaultAdminEmail;
            if (defaultAdminEmail === email) {
                req.admin = decoded;
                return next();
            }

            sendResponse(res, 401, {
                success: false,
                message: "access denied, unauthorized"
            });
        }

        req.admin = isAdmin;
        next();

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            msg: "access denied"
        });
    }
}

module.exports = varifyAdmin;