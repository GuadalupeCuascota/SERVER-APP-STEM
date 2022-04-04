"use strict";
// const  sendMail=async(msg:any)=>{
//   try {
//     await sgMail.send(msg);
//     console.log("Mensaje enviado");
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
//   } catch (error) {
//     console.log(error);
//   }
// };
// => return Promise
//  var mailchimp = require("@mailchimp/mailchimp_marketing");
// export const mail=mailchimp.setConfig({
//   apiKey: "b59c76fbf925cb8c8338acb0d239478e-us14",
//   server: "us14",
// });
// async function run() {
//   try {
//     const response = await mailchimp.ping.get();
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// run();
var nodemailer = require("nodemailer");
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
