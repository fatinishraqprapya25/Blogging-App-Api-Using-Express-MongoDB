const Admin = require("./admin.model")

const createAdmin = async (userDetails) => {
    const result = await Admin.create(userDetails);
    return result;
}

const removeAdmin = async (userId) => {
    const result = await Admin.findByIdAndDelete(userId);
    return result;
}

const adminServices = { createAdmin, removeAdmin };