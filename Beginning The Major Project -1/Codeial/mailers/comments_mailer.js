const nodemailer = require('../config/nodemailer');

// const User = 

// module.exports.newComment = function(){

// }

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer',comment);
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
        html:'<h1>Yup,your comment is now published!</h1>'
    },(error,info)=>{
        if(error){
            console.log('Error in sending mail',error);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
}



 