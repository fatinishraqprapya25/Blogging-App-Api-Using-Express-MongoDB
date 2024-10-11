const User = require("./users.schema");

const createUserIntoDb = async (userData) => {
    const result = await User.create(userData);
    return result;
}

const loginUser = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) return null;
    const checkPass = await user.comparePassword(password);
    if (checkPass) return user;
    return null;
}

const getSingleUser = async (userId) => {
    const result = await User.findById(userId);
    return result;
}

const getAllUsers = async () => {
    const result = await User.find({});
    return result;
}

const updateUser = async (userId, updateData) => {
    const result = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true, runValidators: true }
    );
    return result;
};

const userServices = { createUserIntoDb, getSingleUser, getAllUsers, deleteUser, updateUser, loginUser };
module.exports = userServices;