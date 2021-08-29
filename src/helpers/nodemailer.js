const nodemailer = require('nodemailer')

async function mail(mail, subjet, html) {
    let testAccount = await nodemailer.createTestAccount()

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: 'nikolas.rath4@ethereal.email',
            pass: '4uSSu1P1txvAZ72tyq' 
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = await transporter.sendMail({
        from: 'nikolas.rath4@ethereal.email',
        to: await mail || "nikolas.rath4@ethereal.email",
        subject: await subjet,
        html: await html,
    });

    console.log(info);
}

module.exports = mail