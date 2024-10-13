const adminControllers = require("./admin.controller");
const adminRouter = require("express").Router();

adminRouter.post("/", adminControllers.createAdmin);
adminRouter.patch("/", adminControllers.removeAdmin);

module.exports = adminRouter;