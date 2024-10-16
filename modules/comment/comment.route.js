const commentControllers = require("./comment.controller");
const varifyToken = require("../../middlewares/varifyToken");
const commentUtils = require("./comments.utils");
const commentRouter = require("express").Router();

commentRouter.post("", varifyToken, commentControllers.createComment);
commentRouter.get("/:postId", varifyToken, commentControllers.readComments);
commentRouter.delete("/:commentId", varifyToken, commentUtils.checkAdminOrAuthorForDelete, commentControllers.deleteComment);
commentRouter.patch("/:commentId", varifyToken, commentUtils.checkCommentAuthorForUpdate, commentControllers.updateComment);

module.exports = commentRouter;