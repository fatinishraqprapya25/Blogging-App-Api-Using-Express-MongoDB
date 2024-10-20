const path = require("path");
const deleteUploadedFile = require("../../errors/deleteUploadedFile");

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

module.exports = userUtils;