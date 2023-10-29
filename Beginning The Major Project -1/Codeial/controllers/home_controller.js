const Post = require("../models/post");
const User = require("../models/user");

module.exports.home = async function (req, res) {
  try {
    //populate the user of each post & each comment
    let posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate:{
          path:"likes"
        }
      }).populate('likes');

    let users = await User.find({});

    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      all_users: users,
    });
  } catch (error) {
    console.log('Error in Feed',error);
    return;
  }
};
