const { Traffic } = require("../../utils/saveTrafficData");
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

const getTodaysTraffic = async () => {
    const todaysDate = new Date().toISOString();
    const generalTraffic = await Traffic.countDocuments({ date: todaysDate, userType: "general" });
    const authenticatedTraffic = await Traffic.countDocuments({ date: todaysDate, userType: "authenticated" });
    const total = generalTraffic + authenticatedTraffic;
    return { generalTraffic, authenticatedTraffic, total };
}


const adminServices = { createAdmin, removeAdmin, getAllAdmin, getTodaysTraffic };
module.exports = adminServices;