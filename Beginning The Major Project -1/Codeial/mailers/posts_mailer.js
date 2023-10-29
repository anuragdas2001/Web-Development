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
        //comment > post > user > email
        //You can drill down from the comment to get the email of the user who wrote the post that the comment is associated with.    
        //The key is that each object along the chain contains a reference to the next related object - the comment has a post, the post has a user, and the user has an email.
        // to: comment.post.user.email,
        to:'anuragdas12921@gmail.com',
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



 