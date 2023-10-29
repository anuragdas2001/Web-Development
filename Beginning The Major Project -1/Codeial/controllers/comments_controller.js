const Comment = require("../models/comment");
const Post = require("../models/post");
const Likes = require('../models/like');
const commentsMailer = require('../mailers/comments_mailer');

const comments_email_mailer = require('../workers/comment_email_worker');

const queue = require('../config/kue');
module.exports.create = async function(req, res) {

  try {
    let post = await Post.findById(req.body.post);

    if (post) {
      let comment = await Comment.create({
        content: req.body.content,
        post: req.body.post,
        user: req.user._id,
      });

      post.comments.push(comment);
      await post.save();

      // Populate the 'user' field of the comment with 'name' and 'email'
      comment = await Comment.populate(comment, { path: 'user', select: 'name email' });

      
      // commentsMailer.newComment(comment);

      let job = await queue.create('emails',comment).save(function(error){
        if(error){
          console.log("Error in sending to the Queue",error);
          return;
        }
        console.log('job enqueued',job.id);
      });


      if (req.xhr) {
        return res.status(200).json({
          data: { comment: comment },
          message: 'Comment created!',
        });
      }

      req.flash('success', 'Comment published!');
      return res.redirect('back');
    }
  } catch (err) {
    console.log('Error', err);
    req.flash('error', err);
    return res.redirect('back');
  }
};

  module.exports.delete = async function(req, res) {

    try {
      let comment = await Comment.findById(req.params.id);

      if (!comment) {
        return res.status(404).json({
          message: 'Comment not found',
        });
      }
  
      if (comment.user.toString() === req.user.id) {
        let postId = comment.post;
  
        await Comment.findByIdAndRemove(req.params.id); // Remove the comment
        
        // Remove the comment ID from the post's 'comments' array
        await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });

        await Likes.deleteMany({likeable:comment,onModel:'Comment'});

        // Send a response indicating success
        if (req.xhr) {
          return res.status(200).json({
            data: {
              comment_id: req.params.id,
            },
            message: 'Comment deleted',
          });
        }
  
        req.flash('success', 'Comment deleted!');
        return res.redirect('back');
      } else {
        req.flash('error', 'Unauthorized');
        return res.status(403).redirect('back'); // 403 Forbidden status for unauthorized access
      }
    } catch (err) {
      console.log('Error', err);
      req.flash('error', err.message || 'An error occurred');
      return res.status(500).redirect('back'); // 500 Internal Server Error status for unexpected errors
    }
  };




