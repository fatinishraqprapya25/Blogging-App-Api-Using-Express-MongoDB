const Blog = require("./blogs.model")

const createBlog = async (blogDetail) => {
    const result = await Blog.create(blogDetail);
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

    const totalBlogs = Blog.countDocuments(searchFilter);

    return {
        totalBlogs,
        pages: totalBlogs / options.limit,
        blogs
    }
}

const getSingleBlog = async (blogId) => {
    const result = await Blog.findById(blogId);
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

module.exports = { createBlog, getSingleBlog, deleteBlog, updateBlog };