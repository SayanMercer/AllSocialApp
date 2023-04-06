const nodemailer = require("nodemailer");
const ejs = require('ejs');
const path = require('path')
console.log("nodemailer");
let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'nothing@gmail.com',
        pass:'bisyogrjuapeqifj'

    }
});
// var transporter = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: "4dc1811bb25e9b",
//       pass: "16b913afb08c10"
//     }
//   });

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),
        data,
        function(err, template){
        if(err){console.log('error in rendering template',err); return}

        mailHTML=template;
        }

    )

    return mailHTML;
}

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}