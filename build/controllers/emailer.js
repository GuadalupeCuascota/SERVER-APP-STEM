"use strict";
// const nodemailer = require("nodemailer");
Object.defineProperty(exports, "__esModule", { value: true });
exports.transporter = void 0;
//     const  transporter= nodemailer.createTransport({
//         host: "smtp.mailtrap.io",
//             port: 2525,
//             auth: {
//               user: "c288914d8d85ef",
//               pass: "1ad559c4e5e047"
//             },
//     });
//     const mailOptions={
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: "bar@example.com, baz@example.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     };
//     transporter.sendMail(mailOptions, function (req: Request, res: Response) {
//       (err: any, rows: any) => {
//         if (err) console.log(err);
//         else console.log(rows);
//       };
//     });
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: "ficastemutn@gmail.com",
        pass: "efddjsjsgipipcje",
    },
});
exports.transporter.verify().then(() => {
    console.log("Ready send");
}, (err) => console.log("EL ERROR ", err));
