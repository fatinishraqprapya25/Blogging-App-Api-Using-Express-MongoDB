const adminServices = require("./admin.services");

const createAdmin = async (req, res) => {
    const userDetails = req.body;
    try {
        const result = await adminServices.createAdmin(userDetails);
        sendResponse(res, 200, {
            success: true,
            message: "admin added successfully",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: true,
            message: "failed in adding admin!",
            data: result
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
            data: result
        });
    }
}

const adminControllers = { createAdmin, removeAdmin };
module.exports = adminControllers;