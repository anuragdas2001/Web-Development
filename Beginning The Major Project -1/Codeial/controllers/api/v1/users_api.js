const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
module.exports.createSession = async function (req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });

    if(!user || user.password!=req.body.password){
        return res.json(422,{
            message:"Invalid Username/Password!"
        })
    }
    return res.json(200,{
        message:"Sign in Successful, here is your token,please keep it safe!",
        data:{
            token: jwt.sign(user.toJSON(),'secret',{expiresIn:10000})
        }
    });

  }
  catch (error) {
    console.error("Error deleting post and comments: ", error);
    return res.json(500, {
      message: "Internal Server Error",
    });
  }
};
