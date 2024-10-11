const bcrypt = require("bcrypt");
const config = require("../../config")
const User = require("./users.schema");
const userServices = require("./users.service");

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

        const hashedPassword = await bcrypt.hash(userData.password, Number(config.bcryptCircleCount) || 10);

        userData.password = hashedPassword;

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

const getAllUsers = async (req, res) => {
    try {
        const result = await userServices.getAllUsers();
        res.json({
            status: 200,
            message: "Users retrieved successfully!",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed in retrieving users",
            error: err.message
        });
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userServices.getSingleUser(userId);
        res.json({
            status: 200,
            message: "User retrieved successfully!",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed in retrieving user",
            error: err.message
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userServices.deleteUser(userId);
        res.json({
            status: 200,
            message: "User deleted successfully!",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed in deleting user",
            error: err.message
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userData = req.body;
        const result = await userServices.updateUser(userId, userData);
        res.json({
            status: 200,
            message: "User updated successfully!",
            data: result
        });
    } catch (err) {
        res.status(500).json({
            status: 500,
            message: "Failed in updating user",
            error: err.message
        });
    }
};

const userControllers = { createUser, getAllUsers, getSingleUser, deleteUser, updateUser };
module.exports = userControllers;
