const Blog = require("./blogs.model");

const createBlog = async (blogDetails) => {
    const result = await Blog.create(blogDetails);
    return result;
}

const getAllBlogs = async (searchQuery = "", page = 1, limit = 10, sortOrder = "desc") => {
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { sorBy: sortOrder === "asc" ? 1 : -1 }
    };

    const searchFilter = searchQuery ? {
        isDeleted: false,
        $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { description: { $regex: searchQuery, $options: "i" } }
        ]
    } : { isDeleted: false }

    const blogs = await Blog.find(searchFilter)
        .sort(options.sort)
        .skip((options.page - 1) * options.limit)
        .limit(options.limit)

    const totalBlogs = await Blog.countDocuments(searchFilter);

    return {
        totalBlogs,
        pages: Math.ceil(totalBlogs / options.limit),
        blogs
    }
}

const getSingleBlog = async (blogId) => {
    const result = await Blog.findById(blogId).populate("writer");
    return result;
}

const deleteBlog = async (blogId) => {
    const result = await Blog.findByIdAndUpdate(blogId, { isDeleted: true }, { new: true });
    return result;
}

const updateBlog = async (blogId, update) => {
    const result = await Blog.findByIdAndUpdate(blogId, update, { new: true });
    return result;
}

const blogsService = { createBlog, getSingleBlog, deleteBlog, updateBlog, getAllBlogs };
module.exports = blogsService;