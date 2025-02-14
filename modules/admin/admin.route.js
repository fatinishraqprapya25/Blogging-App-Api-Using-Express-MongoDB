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
adminRouter.post("/approve/:id", varifyAdmin, adminControllers.approveBlog);
adminRouter.post("/disapprove/:id", varifyAdmin, adminControllers.disapproveBlog);

// traffic checking features
adminRouter.get("/traffic/today", varifyAdmin, adminControllers.getTodaysTraffic);
adminRouter.get("/traffic/thisMonth", varifyAdmin, adminControllers.getThisMonthsTraffic);
adminRouter.get("/traffic/thisYear", varifyAdmin, adminControllers.getThisYearsTraffic);

module.exports = adminRouter;