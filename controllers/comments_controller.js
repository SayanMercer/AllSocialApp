const Comment = require('../models/comment');
const Post = require('../models/post');
const commentsMailer = require('../mailers/comments_mailer');
//const queue = require('../config/kue');
//const commentEmailWorker = require('../workers/comment_email_worker');


module.exports.create = async function(req,res){
  console.log(req.body);

  try{
      let post = await Post.findById(req.body.post);
      console.log(post);
      if(post){
       let comment = await Comment.create({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        }); 
         //console.log("Commentcontroller");
          post.comments.push(comment);
          post.save();
          //console.log(comment);

          let newComment = await comment.populate("user"); // doubt
          

          commentsMailer.newComment(comment);
          let job = queueMicrotask.create('emails',comment).save(function(err){
            if(err){
              console.log('error in creating a queue');
            }

            console.log(job.id)

          });

          if(req.xhr){
            //commentsMailer.newComment(comment);
            return res.status(200).json({
              data: {
                comment:comment
              },
              message: "Post Created!"
            });
          }
          req.flash('success','Comment Published!');

          res.redirect('/');
        
      }
  }catch(err){
    req.flash('Error',err);
    res.redirect('/');
    return;
    
  }
}

module.exports.destroy = async function(req, res){
  
  try{
      let comment = await Comment.findById(req.params.id);
    
    
      if (comment.user == req.user.id){
        let postId = comment.post;
        
        comment.remove();
  
        let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
           return res.redirect('back');
        
          
        }else{
          req.flash('error','Unauthorized');
          return res.redirect('back');
        }
    
    }catch(err){
      req.flash('error',err);
      return;
    }
  
  
}

