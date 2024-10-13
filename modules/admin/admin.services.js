const Admin = require("./admin.model")

const createAdmin = async (userDetails) => {
    const result = await Admin.create(userDetails);
    return result;
}

const removeAdmin = async (adminId) => {
    const result = await Admin.findByIdAndDelete(adminId);
    return result;
}

const adminServices = { createAdmin, removeAdmin };
module.exports = adminServices;