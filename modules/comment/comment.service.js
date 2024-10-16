const Comment = require("./comment.model");

const createComment = async (commentData) => {
    const result = await Comment.create(commentData);
    return result;
}

const readComments = async () => {
    const result = await Comment.find({});
    return result;
}

const updateComment = async (commentId, newComment) => {
    const result = await Comment.findByIdAndUpdate(commentId, { text: newComment }, { new: true, runValidators: true });
    return result;
}

const deleteComment = async (commentId) => {
    const result = await Comment.findByIdAndUpdate(commentId, { isDeleted: true }, { new: true, runValidators: true });
    return result;
}

const commentServices = { createComment, readComments, updateComment, deleteComment };

module.exports = commentServices;



