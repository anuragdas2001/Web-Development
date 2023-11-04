const mongoose=require('mongoose');

const comments= new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    //comment belongs to a user
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Likes'
    }]

},{
    timestamps:true
});

const Comments=mongoose.model('Comments',comments);

module.exports=Comments;