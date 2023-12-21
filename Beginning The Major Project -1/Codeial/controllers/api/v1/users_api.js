const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const env = require('../../../config/environment');
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if(!user || user.password!=req.body.password){
      return res.status(422).json({
        message: "Invalid Username/Password!",
      });
    }
    return res.status(200).json({
      message:
        "Sign in Successful, here is your token, please keep it safe!",
      data: {
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: 100000 }),
      },
    });

  }
  catch (error) {
    console.error("Error deleting post and comments: ", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
