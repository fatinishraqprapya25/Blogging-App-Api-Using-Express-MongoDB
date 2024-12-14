const mongoose = require("mongoose");

const trafficSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    userType: { type: String, required: true },
    activities: [
        {
            route: { type: String, required: true },
            method: { type: String, required: true },
            timestamp: { type: Date, default: Date.now },
        }
    ],
    date: { type: String, required: true }

});

const Traffic = mongoose.model("Traffic", trafficSchema);

const saveTrafficData = async (trafficData) => {
    const { userId, route, method, userType } = trafficData;
    const currentDate = new Date().toISOString().split("T")[0];
    try {
        let traffic = await Traffic.findOne({ userId, date: currentDate });
        if (!traffic) {
            traffic = new Traffic({
                userId,
                userType,
                activities: [{ route, method, timestamp: Date.now() }],
                date: currentDate
            });
        } else {
            traffic.activities.push({ route, method, timestamp: Date.now() });
        }

        await traffic.save();

    } catch (err) {
        console.log("Error Occured Saving Traffic Data. ", err.message);
    }
}

module.exports = saveTrafficData;