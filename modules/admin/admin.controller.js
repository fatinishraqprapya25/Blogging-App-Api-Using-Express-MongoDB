const adminServices = require("./admin.services");
const sendResponse = require("../../utils/sendResponse");

const createAdmin = async (req, res) => {
    const userDetails = req.body;
    userDetails.addedBy = req.admin.id;
    try {
        const result = await adminServices.createAdmin(userDetails);
        sendResponse(res, 200, {
            success: true,
            message: "admin added successfully",
            data: result
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
            data: result
        });
    }
}

const adminControllers = { createAdmin, removeAdmin };
module.exports = adminControllers;