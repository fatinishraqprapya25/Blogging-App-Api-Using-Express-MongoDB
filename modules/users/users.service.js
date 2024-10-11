const User = require("./users.schema")

const createUserIntoDb = async (userData) => {
    const result = await User.create(userData);
    return result;
}

const getSingleUser = async (userId) => {
    const result = await User.findById(userId);
    return result;
}

const getAllUsers = async () => {
    const result = await User.find({});
    return result;
}

const deleteUser = async (id) => {
    const result = await User.findByIdAndDelete(id);
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

const userServices = { createUserIntoDb, getSingleUser, getAllUsers, deleteUser, updateUser };
module.exports = userServices;