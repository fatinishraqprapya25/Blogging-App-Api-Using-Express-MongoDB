const varifyAdmin = require("../../middlewares/varifyAdmin");
const adminControllers = require("./admin.controller");
const adminRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const { adminCreationValidationSchema, adminBlogApproveValidationSchema } = require("./admin.validation");

// admin features
adminRouter.post("/", varifyAdmin, validateRequest(adminCreationValidationSchema), adminControllers.createAdmin);
adminRouter.delete("/:id", varifyAdmin, adminControllers.removeAdmin);
adminRouter.get("/", varifyAdmin, adminControllers.getAllAdmin);

// blog features
adminRouter.post("/", varifyAdmin, validateRequest(adminBlogApproveValidationSchema), adminControllers.approveBlog);

module.exports = adminRouter;