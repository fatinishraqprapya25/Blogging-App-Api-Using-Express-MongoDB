const bcrypt = require("bcrypt");

const hashPassword = async (password, circleCount) => {
    const hashedPassword = await bcrypt.hash(password, circleCount || 10);
    return hashedPassword;
}

module.exports = hashPassword;