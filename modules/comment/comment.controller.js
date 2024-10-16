const commentServices = require("./comment.service");
const sendResponse = require("../../utils/sendResponse");

const createComment = async (req, res) => {
    try {
        const commentData = req.body;
        commentData.userId = req.user.id;
        const newComment = await commentServices.createComment(commentData);
        return sendResponse(res, 200, {
            succes: true,
            message: "comment created successfully",
            data: newComment
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "failed in creating comment",
            error
        })
    }
};

const readComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentServices.readComments({ postId });
        return sendResponse(res, 200, {
            success: true,
            message: "comments retrieved successfully",
            data: comments
        });
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "failed retrieving comments",
            error
        });
    }
};

const updateComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;
        const updatedComment = await commentServices.updateComment(commentId, text);

        if (!updatedComment) {
            return sendResponse(res, 500, {
                success: false,
                message: "Comment not found"
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "comment updated successfully",
            data: updatedComment
        })
    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "error occured updating comment",
            error
        })
    }
};

const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params;
        const deletedComment = await commentServices.deleteComment(commentId);

        if (!deletedComment) {
            return sendResponse(res, 404, {
                success: false,
                message: "Comment not found"
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Comment deleted successfully",
            data: deletedComment
        });

    } catch (error) {
        return sendResponse(res, 500, {
            success: false,
            message: "error occured on deleting comment",
            error
        })
    }
};

const commentControllers = {
    createComment,
    readComments,
    updateComment,
    deleteComment,
};

module.exports = commentControllers;