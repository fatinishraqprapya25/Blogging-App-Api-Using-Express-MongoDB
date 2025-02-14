const path = require("path");
const jwt = require("jsonwebtoken");
const deleteUploadedFile = require("../../errors/deleteUploadedFile");
const User = require("./users.model");
const config = require("../../config");

const userUtils = {};

userUtils.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.file) {
            const filePath = path.join(__dirname, "../../", msg.req.file.path);
            console.log(__dirname + "\n" + msg.req.file)
            deleteUploadedFile(filePath);
        }
    }
}

userUtils.verifyCode = async (email, code) => {
    try {
        const user = await User.findOne({ email });
        if (!user) throw new Error("user not found!");
        const decoded = jwt.verify(user.verificationToken, config.jwtSecret);
        if (!decoded) throw new Error("invalid token");
        if (parseInt(decode.verificationCode) === parseInt(code)) return user;
        return false;
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            console.log("hi");
            new Error("JWT has expired");
        }
        throw new Error(err.message);
    }
}

module.exports = userUtils;