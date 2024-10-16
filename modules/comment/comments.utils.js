const Comment = require("./comment.model");
const Admin = require("../admin/admin.model");
const sendResponse = require("../../utils/sendResponse");

const commentUtils = {};

const findCommentAndCheckAuthor = async (commentId, userId) => {
    const comment = await Comment.findById(commentId);
    if (!comment) return { error: "Comment not found!", status: 404 };
    const isAuthor = comment.userId.equals(userId);
    return { comment, isAuthor };
};

commentUtils.checkCommentAuthorForUpdate = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.commentId;

        const { error, status, isAuthor } = await findCommentAndCheckAuthor(commentId, userId);

        if (error) {
            return sendResponse(res, status, {
                success: false,
                message: error,
            });
        }

        if (!isAuthor) {
            return sendResponse(res, 403, {
                success: false,
                message: "You are not allowed to update this comment!",
            });
        }

        next();

    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Internal Server Error",
        });
    }
};

commentUtils.checkAdminOrAuthorForDelete = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const commentId = req.params.commentId;

        const { error, status, isAuthor } = await findCommentAndCheckAuthor(commentId, userId);

        if (error) {
            return sendResponse(res, status, {
                success: false,
                message: error
            });
        }

        const isAdmin = await Admin.find({ user: userId });
        if (!isAdmin && !isAuthor) {
            return sendResponse(res, 403, {
                success: false,
                message: "Only the author or an admin can delete this comment!",
            });
        }

        next();
    } catch (error) {
        sendResponse(res, 500, {
            success: false,
            message: "Internal Server Error",
        });
    }
};

module.exports = commentUtils;
