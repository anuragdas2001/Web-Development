const Like = require("../models/like");
const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.togglelike = async function (req, res) {
  try {
    //likes/toggle/?id=abcdef&type=Post

    let likeable;
    let deleted = false;

    if (req.query.type == "Post") {
      likeable = await Post.findById(req.query.id).populate("likes");
    } else {
      likeable = await Comment.findById(req.query.id).populate("likes");
    }

    //check if a like already exists
    let existingLike = await Like.findOne({
      likeable: req.query.id,
      onModel: req.query.type,
      user: req.user._id,
    });
    //if a like already exists then delete it
    if (existingLike) {
        likeable.likes.pull(existingLike._id);
        likeable.save();
        existingLike.deleteOne();
        deleted = true;
    } else {
      //else make a new like
      let newLike = await Like.create({
      user:req.user._id,
      likeable: req.query.id,
      onModel: req.query.type
      })
      likeable.likes.push(newLike._id);
      // likeable.likes.push(newLike);
      likeable.save();
      deleted = false;
    }

    return res.json(200, {
      message:" Request successful!",
      data:{
          deleted: deleted
      }
    })
  } catch (error) {
    console.log(error);
    return res.status(200).json({ message: 'Internal server error' });
  }
};

module.exports.unlike = function (req, res) {};
