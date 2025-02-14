const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: { type: String, unique: true, required: true },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    profilePicture: String,
    isVerified: {
        type: Boolean,
        default: false
    },
});

// Checking email to handle duplicate emails
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};

// method to compare password during login
userSchema.methods.comparePassword = function (password) {
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;
