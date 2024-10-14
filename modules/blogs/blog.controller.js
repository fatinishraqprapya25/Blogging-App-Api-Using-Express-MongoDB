const blogsService = require("./blogs.service");
const sendResponse = require("../../utils/sendResponse");
const path = require("path");

const createBlog = async (req, res) => {
    const blogDetails = req.body;
    try {
        const blogImage = req.file.path;
        let filePath;

        if (blogImage === null) {
            return sendResponse(res, 500, {
                success: false,
                message: "blog image must be uploaded!",
            });
        }

        filePath = path.join(__dirname, "../../", blogImage);

        blogDetails.blogImage = filePath;
        const result = await blogsService.createBlog(blogDetails);
        sendResponse(res, 200, {
            success: true,
            message: "blog created successfully",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "failed in creating blog!",
            error: err
        });
    }
}

const blogControllers = { createBlog };
module.exports = blogControllers;