const nodemailer = require("nodemailer");

const sendEmail = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "",
                pass: ""
            }
        });
        const result = await transporter.sendMail(mailOptions);
        return result;
    } catch (err) {
        throw new Error("Verification Email coundn't be sent! ", err.message);
    }
}

module.exports = sendEmail;