const saveTrafficData = require("../utils/saveTrafficData");
const varifyToken = require("./varifyToken");

const trackTraffic = (req, res, next) => {
    const userIp = req.ip;

    const trafficData = {
        userIp: userIp,
        route: req.originalUrl,
        method: req.method,
    };

    saveTrafficData(trafficData);
    next();

}

module.exports = trackTraffic;