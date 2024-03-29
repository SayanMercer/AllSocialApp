// const mongoose = require('mongoose');

// const commentSchema = new mongoose.Schema({
//     content:{
//         type: String,
//         required : true 
//     },
//     //comment belongs to a user

//     user: {                                  //we are using user here because comments belong to the USER.
//         type: mongoose.Schema.Types.ObjectId,
//         ref : 'User'
//     },

//     post: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref:'Post'
//     }
// },{
//     timestamps: true
// });


// const  Comment = mongoose.model('Comment', commentSchema);
// module.exports = Comment;

const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    // comment belongs to a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{
    timestamps: true
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;