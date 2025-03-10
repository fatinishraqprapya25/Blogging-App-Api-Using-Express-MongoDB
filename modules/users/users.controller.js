const path = require("path");
const jwt = require("jsonwebtoken");
const config = require("../../config")
const User = require("./users.model");
const userServices = require("./users.service");
const generateToken = require("../../utils/jwt");
const sendResponse = require("../../utils/sendResponse");
const hashPassword = require("../../utils/hashPassword");
const deleteUploadedFile = require("../../errors/deleteUploadedFile");
const sendEmail = require("../../utils/sendEmail");
const generateRandomCode = require("../../utils/generateRandomCode");
const userUtils = require("./users.utils");

const createUser = async (req, res) => {
    try {
        const userData = req.body;
        const filename = req.file ? req.file.path : null;
        let filePath;
        if (filename === null) {
            filePath = path.join(__dirname, "../../uploads/profile", "avatar.jpg");
        } else {
            filePath = path.join(__dirname, "../../", filename);
        }

        userData.profilePicture = filePath;

        const isEmailTaken = await User.isEmailTaken(userData.email);
        if (isEmailTaken) {
            deleteUploadedFile(filePath);
            return res.status(400).json({
                success: false,
                message: "Email is already registered!"
            });
        }

        userData.password = await hashPassword(userData.password, Number(config.bcryptCircleCount));

        const code = generateRandomCode(6);
        const sentVerificationCode = await sendEmail({
            from: config.email,
            to: userData.email,
            subject: "Your Verification Code",
            html: `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Code</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 500px; margin: 20px auto; background: #ffffff; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333;">Your Verification Code</h2>
                    <p style="color: #555; font-size: 16px;">Use the following code to complete your verification process. This code is valid for a limited time.</p>
                    <div style="font-size: 24px; font-weight: bold; color: #007BFF; background: #e8f0fe; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
                        ${code}
                    </div>
                    <p style="color: #555; font-size: 14px;">If you did not request this, please ignore this email.</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #999;">&copy; 2025 Your Company. All rights reserved.</p>
                </div>
            </body>
            </html>`
        });

        if (sentVerificationCode) {
            if (userData.isVerified) delete userData.isVerified;
            if (userData.verificationToken) delete userData.verificationToken;

            const verificationToken = jwt.sign({ verificationCode: code }, config.jwtSecret, { expiresIn: "2m" });
            userData.verificationToken = verificationToken;

            const result = await userServices.createUserIntoDb(userData);
            if (result.verificationToken) delete result.verificationToken;
            return sendResponse(res, 200, {
                success: true,
                message: "User is Registered successfully!",
                data: result
            });

        }

        sendResponse(res, 500, {
            success: false,
            message: "failed registering user!"
        });

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed in creating users",
            error: err
        });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { email, code } = req.body;
        const checkUser = await userUtils.verifyCode(email, code);
        if (checkUser) {
            checkUser.isVerified = true;
            checkUser.verificationToken = "000000";
            const result = await checkUser.save();
            sendResponse(res, 200, {
                success: true,
                message: "user verified successfully!",
                data: result
            });
        } else {
            sendResponse(res, 500, {
                success: false,
                message: "your provided code is invalid!"
            });
        }
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }

};

const resendVerificationCode = async (req, res, user) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return sendResponse(res, 500, {
                success: false,
                message: "User not found!"
            });
        }
        const code = generateRandomCode(6);
        const sentVerificationCode = await sendEmail({
            from: config.email,
            to: email,
            subject: "Your Verification Code",
            html: `<!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verification Code</title>
            </head>
            <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
                <div style="max-width: 500px; margin: 20px auto; background: #ffffff; padding: 20px; text-align: center; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                    <h2 style="color: #333;">Your Verification Code</h2>
                    <p style="color: #555; font-size: 16px;">Use the following code to complete your verification process. This code is valid for a limited time.</p>
                    <div style="font-size: 24px; font-weight: bold; color: #007BFF; background: #e8f0fe; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
                        ${code}
                    </div>
                    <p style="color: #555; font-size: 14px;">If you did not request this, please ignore this email.</p>
                    <p style="margin-top: 20px; font-size: 12px; color: #999;">&copy; 2025 Your Company. All rights reserved.</p>
                </div>
            </body>
            </html>`
        });
        if (sentVerificationCode) {
            const token = jwt.sign({ verificationCode: code }, config.jwtSecret, { expiresIn: "2m" });
            user.verificationToken = token;
            await user.save();
            return sendResponse(res, 200, {
                success: true,
                message: "A Verification Code sent to your email, please verify it..."
            });
        }
        sendResponse(res, 500, {
            success: false,
            message: "error occured sending verification code!"
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

const resetPassword = async (req, res) => {
    try {
        const { code, email, password } = req.body;
        const checkUser = await userUtils.verifyCode(email, code);
        if (checkUser) {
            const hashedPassword = await hashPassword(password, parseInt(config.bcryptCircleCount));
            checkUser.password = hashedPassword;
            const result = await checkUser.save();
            if (!result) throw new Error("Password couldn't be resetted");
            return sendResponse(res, 200, {
                success: true,
                message: "Password reset done! please login."
            });
        }

        sendResponse(res, 500, {
            success: false,
            message: "error occured reseting password!"
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: err.message,
            error: err
        });
    }
}

const loginUser = async (req, res) => {
    const userData = req.body;

    try {
        const result = await userServices.loginUser(userData);
        if (!result) {
            sendResponse(res, 403, {
                success: false,
                message: "incorrect password",
            });
        } else {

            const token = generateToken(result);
            sendResponse(res, 200, {
                success: true,
                message: "user logged in successfully!",
                token
            });
        }

    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "server error occured during login",
        })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const result = await userServices.getAllUsers();
        sendResponse(res, 200, {
            success: true,
            message: "Users retrieved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed in retrieving users",
        })
    }
};

const getSingleUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const result = await userServices.getSingleUser(userId);
        sendResponse(res, 200, {
            success: true,
            message: "User retrieved successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: true,
            message: "Failed in retrieving user",
        });
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const userData = req.body;
        if (userData.password) {
            userData.password = await hashPassword(userData.password, Number(config.bcryptCircleCount));
        }
        const result = await userServices.updateUser(userId, userData);
        sendResponse(res, 200, {
            success: true,
            message: "User updated successfully!",
            data: result
        });
    } catch (err) {
        sendResponse(res, 500, {
            success: false,
            message: "Failed in updating user",
        });
    }
};

const userControllers = { createUser, getAllUsers, getSingleUser, updateUser, loginUser, verifyUser, resendVerificationCode, resetPassword };
module.exports = userControllers;
