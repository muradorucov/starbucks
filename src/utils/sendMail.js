const nodemailer = require("nodemailer");
const config = require("../config");
const contactTemplate = require("../template/contact.template");

const sendMail = async (data) => {
    const { fullName, email, subject } = data
    
    const transporter = nodemailer.createTransport({
        host: "mail.itbtechno.az",
        port: 465,
        secure: true,
        auth: {
            user: config.email,
            pass: config.email_pass,
        },
    });

    const info = await transporter.sendMail({
        from: `${fullName} <${email}>`,
        to: config.email,
        replyTo: email,
        subject: subject,
        html: contactTemplate(data),
    });
    return info
}

module.exports = sendMail;