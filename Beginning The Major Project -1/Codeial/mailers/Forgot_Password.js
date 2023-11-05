const nodemailer = require('../config/nodemailer');
// const User = require("../models/user");



module.exports.reset_Password = (token,name,email) =>{
    console.log('Inside reset_Password mailer');
    console.log(token);
    console.log(name);
    console.log(email);
    let htmlString = nodemailer.renderTemplate({token:token}, '/Forgot_Password/Forgot_Password.ejs');
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: 'anuragdas12921@gmail.com',
        subject: 'Reset Password',
        html: '<p>Hi '+name+' <br><br> Click the following link to reset your password <a href="http://127.0.0.1:8000/users/reset-link/'+token+'">reset</a></p>'
        // html:htmlString
    },(error,info)=>{
        if(error){
            console.log('Error in sending mail',error);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
}