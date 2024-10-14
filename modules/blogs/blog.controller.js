const blogsService = require("./blogs.service");
const sendResponse = require("../../utils/sendResponse");

const createBlog = async (req, res) => {
    const blogDetails = req.body;
    try {
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