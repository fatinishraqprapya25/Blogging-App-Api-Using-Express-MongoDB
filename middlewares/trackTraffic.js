const saveTrafficData = require("../utils/saveTrafficData");

const trackTraffic = (req, res, next) => {
    const userId = req.user?.id ? req.user : null;
    const userType = req.user ? "authenticated" : "general";
    const timestamp = new Date();

    const trafficData = {
        userId,
        userType,
        route: req.originalUrl,
        method: req.method,
        timestamp
    };

    console.log(trafficData);
    saveTrafficData(trafficData);
    next();

}

module.exports = trackTraffic;