const Post = require('../models/post')

module.exports.create = function(req, res){
    Post.create({
        content: req.body.cotent,
        user: req.user._id
    },function(err,post){

    if(err){console.log('error in creating a post'); return;}
       
    return res.redirect('back');
    });
}