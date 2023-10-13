const nodemailer = require('../config/nodemailer');


module.exports.reset_Forgot_Password = (user) =>{
    let htmlString = nodemailer.renderTemplate({user:user}, '/Forgot_Password/Forgot_Password.ejs');
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: 'anuragdas12921@gmail.com',
        subject: 'Reset Password',
        html: htmlString
    },(error,info)=>{
        if(error){
            console.log('Error in sending mail',error);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
}