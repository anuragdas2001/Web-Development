const mongoose=require('mongoose');

const likeSchema= new mongoose.Schema({
   
    //likes belongs to a comment or post
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    //this defines the object id of the liked object
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        refPath:'onModel'
    },
    //this field is used for defining the type of the object since this is a dynamic reference
    onModel:{
        type:String,
        required:true,
        enum:['Post','Comment']
        
    }

},{
    timestamps:true
}

);

const Likes=mongoose.model('Likes',likeSchema);

module.exports=Likes;