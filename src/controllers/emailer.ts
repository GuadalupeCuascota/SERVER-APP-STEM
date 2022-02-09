
var nodemailer=require("nodemailer");

//SENDGRID
// const nodemailer =require('nodemailer');
// const sendgridTransport=require ('nodemailer-sendgrid-transport');
// const sgMail = require('@sendgrid/mail')

// export const transport =nodemailer.createTransport(sendgridTransport({
//   auth:{
//     api_key:'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'
//   }
 
// }))


export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'lupitagcjazy@gmail.com', // generated ethereal user
      pass: 'poovgrkiawszakhj', // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false
    }
  });
  transporter.verify().then(()=>{
      console.log("Ready for send email")
  })

