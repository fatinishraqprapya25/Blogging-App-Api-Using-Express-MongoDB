const userRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./users.validation")
const userControllers = require("./users.controller");
const varifyToken = require("../../middlewares/varifyToken");

const upload = require("../../config/uploadConfig");

// public routes
userRouter.post("/", upload.single("file"), validateRequest(userValidations.creatUserValidationSchema), userControllers.createUser);
userRouter.post("/login", validateRequest(userValidations.userLoginValidationSchema), userControllers.loginUser)
// admin approval needed routes
userRouter.get("/", userControllers.getAllUsers);
userRouter.get("/:id", userControllers.getSingleUser);
// user must be logged in route
userRouter.patch("/", validateRequest(userValidations.updateUserValidationSchema), varifyToken, userControllers.updateUser);

module.exports = userRouter;