const path = require("path");
const jwt = require("jsonwebtoken");
const deleteUploadedFile = require("../../errors/deleteUploadedFile");
const User = require("./users.model");

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
        const decoded = jwt.verify(user.verificationToken);
        if (!decoded) throw new Error("invalid token");
        if (parseInt(decode.verificationCode) === parseInt(code)) return true;
        return false;
    } catch (err) {
        throw new Error(err.message);
    }
}

module.exports = userUtils;