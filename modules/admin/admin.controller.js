const adminServices = require("./admin.services");
const blogServices = require("../blogs/blogs.service");
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
            success: false,
            message: "failed in retrieving admins!",
            error: err
        });
    }
}

const approveBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await blogServices.updateBlog(id,
            { isApproved: true });
        if (!result) {
            return sendResponse(res, 500, {
                success: false,
                message: "failed to approve blog!",
                error: err
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "blog approved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server Error Occured to approve blog",
            error: err
        });
    }
}

const disapproveBlog = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await blogServices.updateBlog(id,
            { isApproved: false });
        if (!result) {
            return sendResponse(res, 500, {
                success: false,
                message: "failed to disapprove blog!",
                error: err
            });
        }
        sendResponse(res, 200, {
            success: true,
            message: "blog disapproved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Server Error Occured to disapprove blog",
            error: err
        });
    }
}

const adminControllers = { createAdmin, removeAdmin, getAllAdmin, approveBlog, disapproveBlog };
module.exports = adminControllers;