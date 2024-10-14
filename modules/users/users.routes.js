const userRouter = require("express").Router();
const validateRequest = require("../../middlewares/validateRequest");
const userValidations = require("./users.validation")
const userControllers = require("./users.controller");
const varifyToken = require("../../middlewares/varifyToken");

const upload = require("../../utils/upload");
const userUtils = require("./users.utils");
const varifyAdmin = require("../../middlewares/varifyAdmin");

// public routes
userRouter.post("/", upload("profile").single("file"), validateRequest(userValidations.creatUserValidationSchema, userUtils.deteteUploadedPhotoIfValidationFailed), userControllers.createUser);
userRouter.post("/login", validateRequest(userValidations.userLoginValidationSchema), userControllers.loginUser)
// admin approval needed routes
userRouter.get("/", varifyAdmin, userControllers.getAllUsers);
userRouter.get("/:id", varifyAdmin, userControllers.getSingleUser);
// user must be logged in route
userRouter.patch("/", validateRequest(userValidations.updateUserValidationSchema), varifyToken, userControllers.updateUser);

module.exports = userRouter;