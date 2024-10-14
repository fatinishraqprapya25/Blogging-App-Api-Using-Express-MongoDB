const path = require("path");
const deleteUploadedFile = require("../../errors/deleteUploadedFile");

const blogUtils = {};

blogUtils.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.file) {
            const filePath = path.join(__dirname, "../../", msg.req.file.path);
            deleteUploadedFile(filePath);
        }
    }
}

module.exports = blogUtils;