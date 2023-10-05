const Post = require("../../../models/post");
const Comment = require("../../../models/comment");
module.exports.index = async function (req, res) {
  let posts = await Post.find({})
    .sort("-createdAt")
    .populate("user")
    .populate({
      path: "comments",
      populate: {
        path: "user",
      },
    });

  return res.json(200, {
    message: "List of Posts",
    posts: posts,
  });
};

module.exports.delete = async function (req, res) {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user == req.user.id) {
      await post.deleteOne();
      console.log("Post Deleted Successfully");

      await Comment.deleteMany({ post: req.params.id });
      console.log("Comments Deleted Successfully");

      return res.status(200).json({
        message: "Post & Assosicated Comments deleted successfully",
      });
    } else {
      return res.status(401).json({
        message: "you cannot delete this post!",
      });
    }
  } catch (error) {
    console.error("Error deleting post and comments: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
