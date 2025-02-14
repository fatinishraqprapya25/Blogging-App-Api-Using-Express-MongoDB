const { saveTrafficData } = require("../utils/saveTrafficData");
const checkLoggedIn = require("../utils/checkLoggedIn");

const trackTraffic = async (req, res, next) => {
    const isLoggedIn = await checkLoggedIn(req);
    const userId = isLoggedIn ? isLoggedIn.id : req.ip;
    const userType = isLoggedIn ? "authenticated" : "general";

    const trafficData = {
        userId,
        userType,
        route: req.originalUrl,
        method: req.method,
    };

    saveTrafficData(trafficData);
    next();

}

module.exports = trackTraffic;