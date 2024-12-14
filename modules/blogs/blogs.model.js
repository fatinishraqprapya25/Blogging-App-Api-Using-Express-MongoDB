const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    writer: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    blogImage: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Types.ObjectId,
            ref: "User"
        }
    ]
}, { timestamps: true });


const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;