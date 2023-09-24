const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = function(req,res){
    Post.findById(req.body.post).then((post)=>{
            
                Comment.create({
                    content:req.body.content,
                    post: req.body.post,
                    user: req.user._id
                }).then((comment)=>{
                    post.comments.push(comment);
                    post.save().then(()=>{
                        return res.redirect('/');
                    })
                    .catch((error)=>{
                        console.log('Error in Commenting !',error);
                        return res.redirect('back');
                  });
                })
                .catch((error)=>{
                    console.log('Error in Commenting !',error);
                    return res.redirect('back');
              });
                

               
            
    })
    .catch((error)=>{
            console.log('Error in Commenting !',error);
            return res.redirect('back');
      });
}

module.exports.delete = function(req,res){
    Comment.findById(req.params.id).then((comment)=>{
        if(comment.user == req.user.id){    
            
            const postId = comment.post;
            comment.deleteOne().then(() => {
                Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } }).then(() => {
                    console.log('Comment deleted Successfully !');
                    return res.redirect('back');
                });
            });
        } 
        else{
            return res.redirect('back');


        }
    })
    .catch((error)=>{
        console.log('Error in Deleting Comment!',error);
    })
}




