const blogRouter = require("express").Router();
const varifyToken = require("../../middlewares/varifyToken");
const blogControllers = require("./blog.controller");
const upload = require("../../utils/upload");
const validateRequest = require("../../middlewares/validateRequest");
const blogValidations = require("./blogs.validation");
const blogUtils = require("./blogs.utils");

blogRouter.post("/", varifyToken, upload("blogs", 10).single("blogImage"), validateRequest(blogValidations.blogCreationValidationSchema, blogUtils.deteteUploadedPhotoIfValidationFailed), blogControllers.createBlog);

blogRouter.get("/:id", blogControllers.getSingleBlog);
blogRouter.get("/", blogControllers.getAllBlogOrSearch);

blogRouter.delete("/:id", varifyToken, blogUtils.checkAuthor, blogControllers.deleteBlog);

blogRouter.post("/like/:blogId", varifyToken, blogControllers.likeBlog);
blogRouter.get("/like/:blogId", blogControllers.getAllLikes);

module.exports = blogRouter;