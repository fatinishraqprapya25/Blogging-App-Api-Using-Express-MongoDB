const adminServices = require("./admin.services");
const sendResponse = require("../../utils/sendResponse");
const Admin = require("./admin.model");

const createAdmin = async (req, res) => {
    const userDetails = req.body;
    userDetails.addedBy = req.admin.id;
    try {
        const isAdmin = await Admin.isAdmin(userDetails.user);
        if (!isAdmin) {
            const result = await adminServices.createAdmin(userDetails);
            return sendResponse(res, 200, {
                success: true,
                message: "admin added successfully",
                data: result
            });
        }

        sendResponse(res, 500, {
            success: false,
            message: "user already in admin list!",
        });


    } catch (err) {
        console.log(err);
        sendResponse(res, 500, {
            success: false,
            message: "failed in adding admin!",
            error: err
        });
    }
}

const removeAdmin = async (req, res) => {
    const userId = req.params.id;
    console.log(req.params);
    try {
        const result = await adminServices.removeAdmin(userId);
        sendResponse(res, 200, {
            success: true,
            message: "admin removed successfully",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: true,
            message: "failed in removing admin!",
            error: err
        });
    }
}

const getAllAdmin = async (req, res) => {
    try {
        const result = await adminServices.getAllAdmin();
        sendResponse(res, 200, {
            success: true,
            message: "admins retrieved successfully",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: true,
            message: "failed in retrieving admins!",
            error: err
        });
    }
}

const adminControllers = { createAdmin, removeAdmin, getAllAdmin };
module.exports = adminControllers;