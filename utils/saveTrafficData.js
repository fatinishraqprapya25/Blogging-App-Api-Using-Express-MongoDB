const mongoose = require("mongoose");

const trafficSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    userType: { type: String, enum: ["authenticated", "general"], required: true },
    route: { type: String, required: true },
    method: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
});

const Traffic = mongoose.model("Traffic", trafficSchema);

const saveTrafficData = async (trafficData) => {
    try {
        const traffic = new Traffic(trafficData);
        await traffic.save();
    } catch (err) {
        console.log("Error Occured Saving Traffic Data. ", err.message);
    }
}

module.exports = saveTrafficData;