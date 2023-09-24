const Post = require("../models/post");
const Comment = require('../models/comment');
module.exports.create_post = function (req, res) {
  Post.create({
    content: req.body.content,
    user: req.user._id,
  })
    .then((post) => {
      return res.redirect("back");
    })
    .catch((error) => {
      console.log("Error in Creating a post !", error);
      return res.redirect("back");
    });
};

// module.exports.delete = function(req,res){
    
//        Post.findById(req.params.id).then((post)=>{
//         // .id means converting the object id into string
//         if(post.user == req.user.id){
//             post.remove();
//             Comment.deleteMany({post:req.params.id}).then(()=>{
//                 console.log('Comments Deleted Successfully');
//                 return res.redirect('back');
//             })
//             .catch((error)=>{
//                 console.log('Error in deleting Comments',error);
//                 return res.redirect('/');
//             })
//         }
//         else{
//             return res.redirect('back');
//         }
//     })

// }

module.exports.delete = function(req, res) {
    Post.findById(req.params.id)
      .then((post) => {
        if (!post) {
          // Handle the case where the post is not found
          return res.redirect('back');
        }
  
        if (post.user == req.user.id) {
          return post.deleteOne()
            .then(() => {
              console.log('Post and Comments Deleted Successfully');
              return Comment.deleteMany({ post: req.params.id });
            })
            .then(() => {
              return res.redirect('back');
            })
            .catch((error) => {
              console.error('Error in deleting Post and Comments', error);
              return res.redirect('/');
            });
        } else {
          return res.redirect('back');
        }
      })
      .catch((error) => {
        console.error('Error in deleting post:', error);
        return res.redirect('/');
      });
  };
  