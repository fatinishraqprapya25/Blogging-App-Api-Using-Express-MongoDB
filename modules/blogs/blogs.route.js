const blogRouter = require("express").Router();
const varifyToken = require("../../middlewares/varifyToken");
const blogControllers = require("./blog.controller");

blogRouter.post("/", varifyToken, blogControllers.createBlog);