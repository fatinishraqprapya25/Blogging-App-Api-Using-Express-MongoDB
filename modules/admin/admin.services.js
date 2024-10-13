const Admin = require("./admin.model")

const createAdmin = async (userDetails) => {
    const result = await Admin.create(userDetails);
    return result;
}

const removeAdmin = async (adminId) => {
    const result = await Admin.findByIdAndDelete(adminId);
    return result;
}

const getAllAdmin = async () => {
    const result = await Admin.find({})
        .populate("user", "-password")
        .populate("addedBy")

    return result;
}

const adminServices = { createAdmin, removeAdmin, getAllAdmin };
module.exports = adminServices;