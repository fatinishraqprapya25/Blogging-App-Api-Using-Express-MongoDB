const commentControllers = require("./comment.controller");
const varifyToken = require("../../middlewares/varifyToken");
const commentRouter = require("express").Router();

commentRouter.post("/", varifyToken, commentControllers.createComment);
commentRouter.get("/", varifyToken, commentControllers.readComments);
commentRouter.delete("/", varifyToken, commentControllers.deleteComment);
commentRouter.update("/", varifyToken, commentControllers.updateComment);

module.exports = commentRouter;