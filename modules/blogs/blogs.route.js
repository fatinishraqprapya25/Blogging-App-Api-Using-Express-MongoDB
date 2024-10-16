const blogRouter = require("express").Router();
const varifyToken = require("../../middlewares/varifyToken");
const blogControllers = require("./blog.controller");
const upload = require("../../utils/upload");
const validateRequest = require("../../middlewares/validateRequest");
const blogValidations = require("./blogs.validation");
const blogUtils = require("./blogs.utils")

blogRouter.post("/", varifyToken, upload("blogs").single("file"), validateRequest(blogValidations.blogCreationValidationSchema, blogUtils.deteteUploadedPhotoIfValidationFailed), blogControllers.createBlog);

blogRouter.get("/:id", varifyToken, blogControllers.getSingleBlog);

blogRouter.get("/", varifyToken, blogControllers.getAllBlogOrSearch);

blogRouter.delete("/:id", varifyToken, blogUtils.checkAuthor, blogControllers.deleteBlog);

module.exports = blogRouter;