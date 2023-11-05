const User = require("../models/user");
const Friendship = require("../models/friendship");

// module.exports.addFriend = async function (req, res) {
//   try {
//     console.log('INSIDE ADD FRIEND');

//     // Check if a Friendship already exists
//     const existingFriendship = await Friendship.findOne({
//       from_user: req.user._id, // Assuming req.user contains the user's ID
//       to_user: req.query.id, // Assuming req.query.id contains the friend's ID
//     });

//     const fromUser = await User.findById(req.user._id);
//     const toUser = await User.findById(req.query.id); // Assuming req.query.id contains the friend's ID

//     console.log('fromUser', fromUser);
//     console.log('toUser', toUser);

//     // If a Friendship already exists, then return an error
//     if (existingFriendship) {
//       return res.status(400).json({
//         message: 'Friendship already exists',
//       });
//     } else {
//       // Create a new friendship
//       const friendship = await Friendship.create({
//         from_user: req.user._id, // Assuming req.user contains the user's ID
//         to_user: req.query.id, // Assuming req.query.id contains the friend's ID
//       });

//       fromUser.friendships.push(friendship);
//       toUser.friendships.push(friendship);

//       await fromUser.save();
//       await toUser.save();
//     }

//     if (req.xhr) {
//       return res.status(200).json({
//         message: 'Friend added successfully',
//       });
//     }

//     return res.status(200).json({
//       message: 'Friend added successfully',
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };
module.exports.addFriend = async function (req, res) {
  try {
    console.log("INSIDE ADD FRIEND");

    const user1Id = req.user.id; // Replace with actual user IDs
    const user2Id = req.params.id; // Replace with actual user IDs

    // Check if a Friendship already exists
    const existingFriendship = await Friendship.findOne({
      $or: [
        { from_user: user1Id, to_user: user2Id },
        { from_user: user2Id, to_user: user1Id },
      ],
    });

    if (existingFriendship) {
      // req.flash('warning','Friendship Already Exists');
      return res.redirect('/');
    }

    // Create a friendship between user1 and user2
    const friendship1 = new Friendship({
      from_user: user1Id,
      to_user: user2Id,
    });

    const friendship2 = new Friendship({
      from_user: user2Id,
      to_user: user1Id,
    });

    await friendship1.save();
    await friendship2.save();

    // Update the 'friendships' field for both users
    const user1 = await User.findByIdAndUpdate(user1Id, {
      $push: { friendships: friendship1._id },
    });

    const user2 = await User.findByIdAndUpdate(user2Id, {
      $push: { friendships: friendship2._id },
    });

    if (!user1 || !user2) {
      console.error("Error updating user1's or user2's friendships");
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    console.log("Friendship successfully created.");
    if (req.xhr) {
      return res.status(200).json({
        data:{
          user1:from_user,
          user2:to_user
        },
        message: "Friend added successfully",
      });
    }

    req.flash('success','Friend Added successfully');
    return res.redirect('/');
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.remove = async function (req, res) {
  try {
    console.log("INSIDE REMOVE FRIEND");

    const friendId = req.params.id;
    const userId = req.user._id; // Assuming req.user contains the user's ID

    // Find the friendship between the current user and the friend
    const friendship = await Friendship.findOne({
      $or: [
        { from_user: userId, to_user: friendId },
        { from_user: friendId, to_user: userId },
      ],
    });

    if (!friendship) {
      req.flash('warning','Friendship not found');
      return res.redirect('/');
    }

    // Remove the friendship from both users
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { friendships: friendship._id },
    });
    const friend = await User.findByIdAndUpdate(friendId, {
      $pull: { friendships: friendship._id },
    });

    if (!user || !friend) {
      console.error("Error removing friendship");
      return res.status(500).json({
        message: 'Internal server error',
      });
    }

    // Delete the friendship record
    // await friendship.remove();
    await Friendship.findByIdAndDelete(friendship._id);


    if (req.xhr) {
      return res.status(200).json({
        data:{
          to_user:req.params.id
        },
        message: 'Friend removed successfully',
      });
    }

    req.flash('success','Friend removed successfully');
    return res.redirect('/');
  } catch (error) {
    console.error("Error removing friend: " , error);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};