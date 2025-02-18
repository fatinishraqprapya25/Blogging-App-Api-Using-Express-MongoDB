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
    const todaysDate = new Date().toISOString().split("T")[0];
    const generalTraffic = await Traffic.countDocuments({ date: todaysDate, userType: "general" });
    const authenticatedTraffic = await Traffic.countDocuments({ date: todaysDate, userType: "authenticated" });
    const total = generalTraffic + authenticatedTraffic;
    return { generalTraffic, authenticatedTraffic, total };
}

const getThisMonthsTraffic = async () => {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const endOfMonth = new Date(startOfMonth);
    endOfMonth.setMonth(startOfMonth.getMonth() + 1);

    const generalTraffic = await Traffic.countDocuments({
        date: {
            $gte: startOfMonth.toISOString().split("T")[0], $lt: endOfMonth.toISOString().split("T")[0]
        },
        userType: "general"
    });
    const authenticatedTraffic = await Traffic.countDocuments({
        date: { $gte: startOfMonth.toISOString().split("T")[0], $lt: endOfMonth.toISOString().split("T")[0] },
        userType: "authenticated"
    })
    const total = generalTraffic + authenticatedTraffic;
    return { generalTraffic, authenticatedTraffic, total };
}

const getThisYearsTraffic = async () => {
    const startOfYear = new Date();
    startOfYear.setMonth(0);
    startOfYear.setDate(1);
    startOfYear.setHours(0, 0, 0, 0);
    const endOfYear = new Date(startOfYear);
    endOfYear.setFullYear(startOfYear.getFullYear() + 1);

    const generalTraffic = await Traffic.countDocuments({
        date: { $gte: startOfYear.toISOString().split("T")[0], $lte: endOfYear.toISOString().split("T")[0] },
        userType: "general"
    });
    const authenticatedTraffic = await Traffic.countDocuments({
        date: { $gte: startOfYear.toISOString().split("T")[0], $lte: endOfYear.toISOString().split("T")[0] },
        userType: "authenticated"
    });
    const total = generalTraffic + authenticatedTraffic;
    return { generalTraffic, authenticatedTraffic, total };
}

const adminServices = { createAdmin, removeAdmin, getAllAdmin, getTodaysTraffic, getThisMonthsTraffic, getThisYearsTraffic };
module.exports = adminServices;