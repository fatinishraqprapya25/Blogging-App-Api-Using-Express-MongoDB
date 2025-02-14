const nodemailer = require("nodemailer");
const config = require("../config");

const sendEmail = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: config.email,
                pass: config.appPass
            }
        });
        const result = await transporter.sendMail(mailOptions);
        console.log(result);
        return result;
    } catch (err) {
        throw new Error("Email coundn't be sent! ", err.message);
    }
}

module.exports = sendEmail;