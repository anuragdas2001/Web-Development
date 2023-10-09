const nodemailer = require("nodemailer");
const ejs= require('ejs');
const path = require('path');



const transporter = nodemailer.createTransport({
  service:'gmail',
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // two factor authentication
  auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: "anuragdas12921@gmail.com",
    pass: "sxar wjeq fyuy wvny",
  },
});


let renderTemplate = (data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailer.ejs',relativePath),
        data,
        function(error,template){
            if(error){
                console.log('Error in rendering template',error);
                return;
            }

            mailHTML=template;
        }

    )
        return mailHTML;
}

module.exports.transporter = transporter;
module.exports.renderTemplate = renderTemplate;