const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    addedBy: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
    }
});

// Checking email to handle duplicate
adminSchema.statics.isAdmin = async function (userId) {
    const user = await this.findOne({ user: userId });
    return !!user;
};


const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;