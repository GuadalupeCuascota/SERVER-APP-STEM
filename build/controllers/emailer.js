"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
var nodemailer = require("nodemailer");
//SENDGRID
// const nodemailer =require('nodemailer');
// const sendgridTransport=require ('nodemailer-sendgrid-transport');
// const sgMail = require('@sendgrid/mail')
// export const transport =nodemailer.createTransport(sendgridTransport({
//   auth:{
//     api_key:'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'
//   }
// }))
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'lupitagcjazy@gmail.com',
        pass: 'poovgrkiawszakhj',
    },
    tls: {
        rejectUnauthorized: false
    }
});
exports.transporter.verify().then(() => {
    console.log("Ready for send email");
});
