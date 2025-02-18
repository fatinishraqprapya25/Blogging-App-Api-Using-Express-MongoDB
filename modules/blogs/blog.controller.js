const blogsService = require("./blogs.service");
const sendResponse = require("../../utils/sendResponse");
const path = require("path");
const Admin = require("../admin/admin.model");
const countTimeToReadBlog = require("../../utils/countTimeToReadBlog");

const createBlog = async (req, res) => {
    const blogDetails = req.body;
    try {
        blogDetails.writer = req.user.id;
        delete blogDetails.isApproved;
        const isAdmin = await Admin.isAdmin(req.user.id);
        if (isAdmin) {
            blogDetails.isApproved = true
        }
        if (!req.file || !req.file.path) {
            return sendResponse(res, 500, {
                success: false,
                message: "blog image must be uploaded!",
            });
        }
        const blogImage = req.file.path;

        const filePath = path.join(__dirname, "../../", blogImage);

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
            if (!result) {
                sendResponse(res, 404, {
                    success: false,
                    message: "blog not found!",
                });
            } else {
                // calculate time to read a blog
                const timeNeeds = countTimeToReadBlog(result.description);
                sendResponse(res, 200, {
                    success: true,
                    message: "blog fetched successfully",
                    data: { timeNeedsToRead: timeNeeds, blog: result }
                });
            }
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

const deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id;
        const result = await blogsService.deleteBlog(blogId);
        sendResponse(res, 200, {
            success: true,
            message: "blog deleted successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "failed deleting blog!",
            error: err
        });
    }
}

const likeBlog = async (req, res) => {
    try {
        const { blogId } = req.params;
        const userId = req.user.id;
        const result = await blogsService.likeBlog(blogId, userId);
        if (result) {
            sendResponse(res, 200, {
                success: true,
                message: "action successfull!",
                data: result
            });
        } else {
            sendResponse(res, 500, {
                success: false,
                message: "action failed!",
            });
        }

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "action failed!",
            error: err
        });
    }
}

const getAllLikes = async (req, res) => {
    try {
        const { blogId } = req.params;
        const result = await blogsService.getAllLikes(blogId);
        if (result) {
            sendResponse(res, 200, {
                success: true,
                message: "all likes fetched successfully!",
                data: result
            });
        } else {
            sendResponse(res, 500, {
                success: false,
                message: "failed error in fetching likes!",
            });
        }

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "error occured on fetching likes!",
            error: err
        });
    }
}

const blogControllers = { createBlog, getSingleBlog, getAllBlogOrSearch, deleteBlog, likeBlog, getAllLikes };
module.exports = blogControllers;