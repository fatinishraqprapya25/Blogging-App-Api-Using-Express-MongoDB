const varifyAdmin = require("../../middlewares/varifyAdmin");
const adminControllers = require("./admin.controller");
const adminRouter = require("express").Router();

adminRouter.post("/", varifyAdmin, adminControllers.createAdmin);
adminRouter.patch("/:id", varifyAdmin, adminControllers.removeAdmin);
adminRouter.get("/", varifyAdmin, adminControllers.getAllAdmin);

module.exports = adminRouter;