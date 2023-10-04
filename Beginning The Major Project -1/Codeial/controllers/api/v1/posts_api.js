const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index=async function(req,res){


    let posts = await Post.find({})
      .sort('-createdAt')
      .populate("user")
      .populate({
        path: "comments",
        populate: {
          path: "user",
        },
      });

        return res.json(200,{
            message : "List of Posts",
            posts:posts
        })
}

module.exports.delete = async function (req, res) {

    try {
      const post = await Post.findById(req.params.id);
     
    //   if (post.user == req.user.id) {
        await post.deleteOne();
        console.log("Post Deleted Successfully");
  
        await Comment.deleteMany({ post: req.params.id });
        console.log("Comments Deleted Successfully");
       
        return res.json(200,{
            message:"Post & Assosicated Comments deleted successfully"
        })
    //   } 
    //     req.flash('error','You cannot delete this post!');
    //     return res.redirect("back");
      
    } 
    catch (error) {
      console.error("Error deleting post and comments: ", error);
    //   req.flash('error',error);
      return res.json(500,{
        message:"Internal Server Error"
      })
    }
  };
  