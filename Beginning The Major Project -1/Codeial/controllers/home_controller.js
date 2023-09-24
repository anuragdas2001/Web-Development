const Post = require('../models/post')

module.exports.home= function(req,res){
    // console.log(req.cookies);
    // res.cookie('user1',25);
//     Post.find({}).then((posts)=>{
//         return res.render('home',{
//             title: "Codeial | Home",
//             posts:posts
//         })
//     }).catch((error)=>{
//         console.log('Error in posting Content !',error);
//         return res.redirect('back');
//     })

// };

//populate the user of each post & each comment
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec().then((posts)=>{
        return res.render('home',{
            title: "Codeial | Home",
            posts:posts
        })
    }).catch((error)=>{
        console.log('Error in posting Content !',error);
        return res.redirect('back');

    });


}

