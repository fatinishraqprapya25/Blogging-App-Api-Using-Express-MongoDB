const varifyAdmin = require("../../middlewares/varifyAdmin");
const adminControllers = require("./admin.controller");
const adminRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const adminCreationValidationSchema = require("./admin.validation");

adminRouter.post("/", varifyAdmin, validateRequest(adminCreationValidationSchema), adminControllers.createAdmin);
adminRouter.delete("/:id", varifyAdmin, adminControllers.removeAdmin);
adminRouter.get("/", varifyAdmin, adminControllers.getAllAdmin);

module.exports = adminRouter;