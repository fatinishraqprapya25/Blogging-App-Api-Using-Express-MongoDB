const path = require("path");
const deleteUploadedFile = require("../../middlewares/deleteUploadedFile");

const userUtils = {};

userUtils.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.file) {
            const filePath = path.join(__dirname, "../../", msg.req.file.path);
            deleteUploadedFile(filePath);
        }
    }
}

module.exports = userUtils;