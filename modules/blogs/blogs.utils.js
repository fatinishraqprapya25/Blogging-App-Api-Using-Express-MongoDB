const path = require("path");
const deleteUploadedFile = require("../../errors/deleteUploadedFile");
const Admin = require("../admin/admin.model");
const Blog = require("./blogs.model");
const sendResponse = require("../../utils/sendResponse");

const blogUtils = {};

// delete uploaded photo if validation failed
blogUtils.deteteUploadedPhotoIfValidationFailed = function (msg) {
    if (!msg.success) {
        if (msg.req.file) {
            const filePath = path.join(__dirname, "../../", msg.req.file.path);
            deleteUploadedFile(filePath);
        }
    }
}

// before deleting blog, check request is from author or not
blogUtils.checkAuthor = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const isAdmin = await Admin.findById(userId);

        if (!isAdmin) {
            const postId = req.params.id;
            const blog = await Blog.findById(postId);

            if (!blog) {
                return sendResponse(res, 404, {
                    success: false,
                    message: "Blog post not found!",
                })
            }
          
            if (!blog.writer.equals(userId)) {
                return sendResponse(res, 500, {
                    success: false,
                    message: "Only admins or author can delete this blog",
                })
            }
        }

        next();

    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = blogUtils;