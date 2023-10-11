const nodemailer = require('../config/nodemailer');


module.exports.reset_Password = () =>{
    let htmlString = nodemailer.renderTemplate({comment:comment}, '/Forgot_Password/Forgot_Password.ejs');
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: comment.user.email,
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