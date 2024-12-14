const Blog = require("./blogs.model");

const createBlog = async (blogDetails) => {
    const result = await Blog.create(blogDetails);
    return result;
}

const getAllBlogs = async (searchQuery = "", page = 1, limit = 10, sortOrder = "desc") => {
    const validPage = Math.max(parseInt(page, 10), 1);
    const validLimit = Math.max(parseInt(limit, 10), 1);

    const options = {
        page: validPage,
        limit: validLimit,
        sort: { createdAt: sortOrder === "asc" ? 1 : -1 }
    };

    const searchFilter = searchQuery
        ? {
            isDeleted: false,
            isApproved: true,
            $or: [
                { title: { $regex: searchQuery, $options: "i" } },
                { description: { $regex: searchQuery, $options: "i" } }
            ]
        }
        : { isDeleted: false };

    const blogs = await Blog.find(searchFilter)
        .sort(options.sort)
        .skip((options.page - 1) * options.limit)
        .limit(options.limit);

    const totalBlogs = await Blog.countDocuments(searchFilter);

    return {
        totalBlogs,
        pages: Math.ceil(totalBlogs / options.limit),
        blogs
    };
};

const getSingleBlog = async (blogId) => {
    let result = await Blog.findOne({ _id: blogId }).populate("writer");
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

const likeBlog = async (blogId, userId) => {
    const blog = await Blog.findById(blogId);
    if (!blog) throw new Error("Blog not found!");
    const likedIndex = blog.likes.indexOf(userId);
    if (likedIndex === -1) {
        blog.likes.push(userId);
    } else {
        blog.likes.splice(likedIndex, 1);
    }
    await blog.save();
    return blog;
}

const blogsService = { createBlog, getSingleBlog, deleteBlog, updateBlog, getAllBlogs, likeBlog };
module.exports = blogsService;