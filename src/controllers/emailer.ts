import { send } from "process";

const nodemailer = require('nodemailer'); 
const nodemailerSendgrid=require('nodemailer-sendgrid')
const sendgridMailer=require('@sendgrid/mail')
sendgridMailer.setApiKey('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')


const message={
  from: 'pgcuascotac@utn.edu.ec',
    to: 'lupitagcjazy@gmail.com',
    subject:'Prueba',
    html:
        "<b> La mentoria agendada ha sido cancelada</b>  <b>" +
        
        "</b>",

}
// sendgridMailer.send(message)
// .then(()=>{
//   console.log("email enviado")
// })
// .catch(()=>{
// console.log("errror")
// })



const createTrans =()=>{
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c288914d8d85ef",
      pass: "1ad559c4e5e047"
    }
  });
  
  // const transport=nodemailer.createTransport
  
  // (nodemailerSendgrid({
  //   apiKey:'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'
        
        
  //   })
  // );

  return transport;
}

export const   sendMail=async (user:any)=>{

  console.log("el usuario",user)
  // const transporter=createTrans()
  const info=await sendgridMailer.send({
    from: 'pgcuascotac@utn.edu.ec',
    to: user,
    subject:'Prueba',
    html:
        "<b> La mentoria agendada ha sido cancelada</b>  <b>" +
        
        "</b>",

  })
  .then(()=>{
      console.log("email enviado")
    })
    .catch(()=>{
    console.log("errror")
    })
  // console.log("Message sent:",info.messageId)
  // // return info

}


exports.SendMail=(user:any)=>sendMail(user)

// const transporter = nodemailer.createTransport( 
//   sendgridTransport({ 
//     auth: { 
//       api_user: process.env.SENDGRID_API_USER, // SG nombre de usuario 
//       api_key: process.env.SENDGRID_API_PASSWORD, // SG contraseña 
//     }, 
//   }) 
// );

// const options = { 
//   from: 'pgcuascotac@utn.edu.ec', // sender address
//   to: '', // list of receivers
//   subject: "Mentoria agendada ", // Subject line
//   text: "La mentoria agendada ha sido cancelada", // plain text body
//   html:
//     "<b> La mentoria agendada ha sido cancelada</b>  <b>" +
    
//     "</b>",

// };

// transporter.sendMail(options,(err,info))























// export { };





// import nodemailer = require("nodemailer");
// var sgTransport = require('nodemailer-sendgrid-transport');


// // import nodemailerSendgrid = require("nodemailer-sendgrid");

// // const sendgridTransport = require('nodemailer-sendgrid-transport');
// // export const transporter = nodemailer.createTransport(sendgridTransport({
// //     auth: {
// //         api_key: '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'
// //     }
// // }))













// export const transporter = nodemailer.createTransport({
  
//   host: "smtp.gmail.com",
//   port: 456,
//   auth: {
//     user: "lupitagcjazy@gmail.com",
//     pass: "fzyyihrvgjylmqlw"
//   },
// //   tls: {
// //     rejectUnauthorized: false
// // }
// });

// transporter.verify().then(()=>{
//     console.log("Ready send")
// },(err)=>console.log("EL ERROR ",err)
// )
