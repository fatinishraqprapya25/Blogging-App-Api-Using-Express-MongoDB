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

Admin.statics.varifyAdminBeforeAddingNewAdmin = async (token = "", email = "") => {

}

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;