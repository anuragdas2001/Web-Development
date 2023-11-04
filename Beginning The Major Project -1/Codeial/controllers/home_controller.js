const Post = require("../models/post");
const User = require("../models/user");
const Friendship = require("../models/friendship");
// module.exports.home = async function (req, res) {
//   try {
//     //populate the user of each post & each comment

//     let posts = await Post.find({})
//       .sort('-createdAt')
//       .populate("user")
//       .populate({
//         path: "comments",
//         populate: {
//           path: "user",
//         },
//         populate:{
//           path:"likes"
//         }
//       }).populate('likes');

//       let users = await User.find({});
//       // Populate the friends for the currently logged in user
   
//       let loggedInUser=req.user;
//       // console.log('loggedInUser',loggedInUser);
//       let friendslist = await User.findOne(loggedInUser)
//       .populate({
//         path:'friendships',
//         populate:{
//           path:'to_user'
//         }
//       });

//       // if(!friendslist){
//       //   console.log('User not found');
//       // return res.status(404).json({ message: 'User not found' });
//       // }

//       console.log('friendslist ------->',friendslist.friendships);

//     return res.render("home", {
//       title: "Codial | Home",
//       posts: posts,
//       all_users: users,
//       all_friends : friendslist.friendships
//     });
//   } catch (error) {
//     console.log('Error in Feed',error);
//     return res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

module.exports.home = async function (req, res) {
  try {
    // Populate the user of each post, each comment, and their likes

    // Retrieve the posts and populate associated data
    const posts = await Post.find({})
      .sort({ createdAt: -1 }) // Sort by createdAt in descending order
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
        populate: {
          path: "likes", // Assuming 'likes' is a field in your comment model
        },
      })
      .populate('likes'); // Assuming 'likes' is a field in your post model

    // Retrieve all users
    const users = await User.find({});

    // Populate the friends for the currently logged in user
    const loggedInUserId = req.user; // Assuming req.user is the ID of the logged-in user

    const loggedInUser = await User.findById(loggedInUserId)
      .populate({
        path: 'friendships',
        populate: {
          path: 'to_user',
        },
      });

    // if (!loggedInUser) {
    //   console.log('User not found');
    //   return res.status(404).json({ message: 'User not found' });
    // }

    console.log('friendslist ------->', loggedInUser.friendships);

    return res.render("home", {
      title: "Codial | Home",
      posts: posts,
      all_users: users,
      all_friends: loggedInUser.friendships, // Assuming 'friendships' is the list of friends
    });
  } catch (error) {
    // console.log('Error in Feed', error);
    // return res.status(500).json({ message: 'Internal Server Error' });
    return res.redirect('/users/sign-in');
  }
};
