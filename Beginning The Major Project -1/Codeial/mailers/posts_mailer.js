const nodemailer = require('../config/nodemailer');

// const User = 

// module.exports.newComment = function(){

// }

// this is another way of exporting a method
exports.newPost = (post) => {
    console.log('Inside newPost mailer',post);
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: post.user.email,
        subject: 'New Post Published',
        html:'<h1>Yup,your Post is now published!</h1>'
    },(error,info)=>{
        if(error){
            console.log('Error in sending mail',error);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
}



 