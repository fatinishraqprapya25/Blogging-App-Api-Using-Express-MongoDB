const userRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./users.validation")
const userControllers = require("./users.controller");

userRouter.post("/", validateRequest(userValidations.creatUserValidationSchema), userControllers.createUser);
userRouter.post("/login", validateRequest(userValidations.userLoginValidationSchema), userControllers.loginUser)
userRouter.get("/", userControllers.getAllUsers);
userRouter.get("/:id", userControllers.getSingleUser);
userRouter.patch("/:id", validateRequest(userValidations.updateUserValidationSchema), userControllers.updateUser);

module.exports = userRouter;