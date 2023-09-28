const Post = require("../models/post");
const Comment = require("../models/comment");
module.exports.create_post = async function (req, res) {
  try {
    await Post.create({
      content: req.body.content,
      user: req.user._id,
    });
    return res.redirect("back");
  } catch (error) {
    console.log("Error in Creating a post !", error);
    return;
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

      return res.redirect("back");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.error("Error deleting post and comments: ", error);
    return res.redirect("/");
  }
};
