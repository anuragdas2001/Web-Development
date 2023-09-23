const Post = require("../models/post");
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
