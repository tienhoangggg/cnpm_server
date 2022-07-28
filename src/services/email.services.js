const env = require("dotenv").config(); 
const nodemailer = require("nodemailer");

let sendEmail = async(email, fullname, token)=>{
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_APP, // generated ethereal user
          pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });
    

    let info = await transporter.sendMail({
        from: '"Wibu wallpaper 👻" <nqthang2505@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Verfiy your email", // Subject line
        // text: "Hello world?", // plain text body
        html: `<h2> ${fullname}! Thanks for registering on our site </h2>
                <h4>Please verify your email to continues....</h4>
                <a href="${process.env.URL_CLIENT}/verify/${token}">Verify your Email</a>
        `
    });
}

module.exports = {
    sendEmail: sendEmail
}