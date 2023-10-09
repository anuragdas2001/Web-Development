const nodemailer = require('../config/nodemailer');

// const User = 

// module.exports.newComment = function(){

// }

// this is another way of exporting a method
exports.newComment = (comment) => {
    console.log('Inside newComment mailer',comment);
 let htmlString = nodemailer.renderTemplate({comment:comment}, '/comments/new_comments.ejs');
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: comment.user.email,
        subject: 'New Comment Published',
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



 