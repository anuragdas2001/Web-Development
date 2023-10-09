const nodemailer = require('../config/nodemailer');

// const User = 

// module.exports.newComment = function(){

// }

// this is another way of exporting a method
exports.newPost = (post) => {
    console.log('Inside newPost mailer',post);
 let htmlString = nodemailer.renderTemplate({post:post}, '/posts/new_posts.ejs');
    
    nodemailer.transporter.sendMail({
        from: 'anuragdas12921@gmail.com',
        to: post.user.email,
        subject: 'New Post Published',
        html:htmlString 
    },(error,info)=>{
        if(error){
            console.log('Error in sending mail',error);
            return;
        }
        console.log("Mail delivered",info);
        return;
    })
}



 