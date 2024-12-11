const commentControllers = require("./comment.controller");
const varifyToken = require("../../middlewares/varifyToken");
const commentUtils = require("./comments.utils");
const validateRequest = require("../../middlewares/validateRequest");
const commentValidations = require("./comment.validation");

const commentRouter = require("express").Router();

commentRouter.post("/", varifyToken, validateRequest(commentValidations.createComment), commentControllers.createComment);

commentRouter.get("/:postId", commentControllers.readComments);

commentRouter.delete("/:commentId", varifyToken, commentUtils.checkAdminOrAuthorForDelete, commentControllers.deleteComment);

commentRouter.patch("/:commentId", varifyToken, commentUtils.checkCommentAuthorForUpdate, validateRequest(commentValidations.updateComment), commentControllers.updateComment);

commentRouter.post("/reply/:commentId", varifyToken, validateRequest(commentValidations.replyComment), commentControllers.createReply);

commentRouter.delete("/reply/:commentId/:replyId", varifyToken, commentUtils.checkAdminOrAuthorForDelete, commentControllers.deleteReply);

module.exports = commentRouter;