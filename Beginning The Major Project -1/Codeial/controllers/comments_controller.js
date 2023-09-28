const Comment = require("../models/comment");
const Post = require("../models/post");
module.exports.create = async function(req, res) {

    try {
  
      const post = await Post.findById(req.body.post);
  
      const comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id
      });
  
      post.comments.push(comment);
  
      await post.save();
      
      return res.redirect('/');
  
    } catch (error) {
      console.log('Error creating comment: ', error);
      return res.redirect('back'); 
    }
  
  };

  module.exports.delete = async function(req, res) {

    try {
  
      const comment = await Comment.findById(req.params.id);
  
      if(comment.user == req.user.id) {
  
        await comment.deleteOne();
        console.log("Comment deleted successfully");
  
        const postId = comment.post;
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id }});
  
        return res.redirect('back');
  
      } else {
        return res.redirect('back');
      }
  
    } catch (err) {
      console.log('Error deleting comment: ', err);
      return res.redirect('back');
    }
  
  };




