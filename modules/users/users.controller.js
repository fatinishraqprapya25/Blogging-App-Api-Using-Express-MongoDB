const config = require("../../config")
const User = require("./users.schema");
const userServices = require("./users.service");
const generateToken = require("../../utils/jwt");
const sendResponse = require("../../utils/sendResponse");
const hashPassword = require("../../utils/hashPassword");

const createUser = async (req, res) => {
    try {
        const userData = req.body;

        const isEmailTaken = await User.isEmailTaken(userData.email);
        if (isEmailTaken) {
            return res.status(400).json({
                status: 400,
                message: "Email is already registered!"
            });
        }

        userData.password = await hashPassword(userData.password, Number(config.bcryptCircleCount));

        const result = await userServices.createUserIntoDb(userData);
        res.json({
            status: 200,
            message: "User is Registered successfully!",
            data: result
        });

    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed in creating users",
            error: err.message
        });
    }
};

const loginUser = async (req, res) => {
    const userData = req.body;

    try {
        const result = await userServices.loginUser(userData);
        if (!result) {
            sendResponse(res, 403, {
                success: false,
                message: "incorrect password",
            });
        } else {

            const token = generateToken(result);
            sendResponse(res, 200, {
                success: true,
                message: "user logged in successfully!",
                token
            });
        }

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "server error occured during login",
        })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const result = await userServices.getAllUsers();
        sendResponse(res, 200, {
            success: true,
            message: "Users retrieved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed in retrieving users",
        })
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userServices.getSingleUser(userId);
        sendResponse(res, 200, {
            success: true,
            message: "User retrieved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: true,
            message: "Failed in retrieving user",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = req.body;
        if (userData.password) {
            userData.password = await hashPassword(userData.password, Number(config.bcryptCircleCount));
        }
        const result = await userServices.updateUser(userId, userData);
        sendResponse(res, 200, {
            success: true,
            message: "User updated successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed in updating user",
        });
    }
};

const userControllers = { createUser, getAllUsers, getSingleUser, updateUser, loginUser };
module.exports = userControllers;
