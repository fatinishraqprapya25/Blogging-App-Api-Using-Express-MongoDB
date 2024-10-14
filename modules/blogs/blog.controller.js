const blogsService = require("./blogs.service");
const sendResponse = require("../../utils/sendResponse");
const path = require("path");
const Admin = require("../admin/admin.model");

const createBlog = async (req, res) => {
    const blogDetails = req.body;
    try {
        blogDetails.writer = req.user.id;
        delete blogDetails.isApproved;
        const isAdmin = await Admin.isAdmin(req.user.id);
        if (isAdmin) {
            blogDetails.isApproved = true
        }

        console.log(blogDetails)

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

const getSingleBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        if (blogId) {
            const result = await blogsService.getSingleBlog(blogId);
            sendResponse(res, 200, {
                success: true,
                message: "blog fetched successfully",
                data: result
            });
        } else {
            sendResponse(res, 500, {
                success: false,
                message: "please provide blog id",
            });
        }

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "error occured on fetching blog",
            error: err
        });
    }
}

const getAllBlogOrSearch = async (req, res) => {
    try {
        const query = req.query.query ? req.query.query : "";
        const page = req.query.page;
        const limit = req.query.limit ? req.query.limit : 10;
        const sortBy = req.query.sortBy ? req.query.sortBy : "asc";
        const result = await blogsService.getAllBlogs(query, page, limit, sortBy);

        sendResponse(res, 200, {
            success: true,
            message: "blogs retrieved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "failed retrieving blogs",
            error: err
        });
    }
}

const blogControllers = { createBlog, getSingleBlog, getAllBlogOrSearch };
module.exports = blogControllers;