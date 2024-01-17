const constants = require('../constants');
const nodemailer = require('nodemailer');
const geraCod = require('../functions/gera_id')

function sendMailVerify(email) {
    const transporter = nodemailer.createTransport({
        host: constants.NODEMAILER_SMTP_HOST,
        port: 465,
        secure: true,
        auth: {
            user: constants.NODEMAILER_AUTH_USER,
            pass: constants.NODEMAILER_AUTH_PASS,
        },
    });
    const codVerify =  geraCod()

    const mailOptions = {
        from: constants.MAIL_OPTIONS_FROM,
        to: email,
        subject: constants.MAIL_OPTIONS_SUBJECT,
        text: `${constants.MAIL_OPTIONS_TEXT_PART1} \n \n ${codVerify} \n \n \n ${constants.MAIL_OPTIONS_TEXT_PART2}`,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log(constants.NODEMAILER_MAIL_SEND + info.response);
                resolve(codVerify);
            }
        });
    });
}

module.exports = sendMailVerify;
