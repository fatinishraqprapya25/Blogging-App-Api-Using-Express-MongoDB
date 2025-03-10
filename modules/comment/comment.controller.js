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
        });
    }
};

const readComments = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await commentServices.readComments(postId);
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

const createReply = async (req, res) => {
    try {
        const replyDetails = req.body;
        replyDetails.userId = req.user.id;
        const { commentId } = req.params;
        const result = await commentServices.createReply(commentId, replyDetails);

        if (!result) {
            return sendResponse(res, 500, {
                success: false,
                message: "failed replying",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "reply sent",
            data: result
        });

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "failed replying",
            error: err
        });
    }
}

const deleteReply = async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const result = await commentServices.deleteReply(commentId, replyId);

        if (!result) {
            return sendResponse(res, 404, {
                success: false,
                message: "Reply or Comment not found",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Reply deleted successfully",
            data: result,
        });
    } catch (err) {
        return sendResponse(res, 500, {
            success: false,
            message: "Failed to delete reply",
            error: err,
        });
    }
};

const updateReply = async (req, res) => {
    try {
        const { commentId, replyId } = req.params;
        const { text } = req.body;
        const result = await commentServices.updateReply(commentId, replyId, text);
        if (!result) {
            return sendResponse(res, 500, {
                success: false,
                message: "server error in updating reply",
            });
        }

        return sendResponse(res, 200, {
            success: true,
            message: "Reply updated successfully",
            data: result,
        });
    } catch (err) {
        console.log(err);
        return sendResponse(res, 500, {
            success: false,
            message: "Failed to update reply!",
            error: err,
        });
    }
}


const commentControllers = {
    createComment,
    readComments,
    updateComment,
    deleteComment,
    createReply,
    deleteReply,
    updateReply
};

module.exports = commentControllers;
