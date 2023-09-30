const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create_post = async function (req, res) {
  try {
   let post = await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    if(req.xhr){
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post Created!"
      })
    }
    req.flash('success','Post Published!');
    return res.redirect("back");
  } catch (error) {
    console.log("Error in Creating a post !", error);
    req.flash('error',error);
    return res.redirect("back");
  }
};

module.exports.delete = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);
   
    if (post.user == req.user.id) {
      await post.deleteOne();
      console.log("Post Deleted Successfully");

      await Comment.deleteMany({ post: req.params.id });
      console.log("Comments Deleted Successfully");
      if(req.xhr){
        return res.status(200).json({
          data:{
            post_id:req.params.id
          },
          message:"Post Deleted!"
        })
      }
      req.flash('success','Post and associated comments deleted!');
      return res.redirect("back");
    } 
      req.flash('error','You cannot delete this post!');
      return res.redirect("back");
    
  } catch (error) {
    console.error("Error deleting post and comments: ", error);
    req.flash('error',error);
    return res.redirect("back");
  }
};
