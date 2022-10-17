// const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');
let path = require('path');
// const { log } = require("console");

// read post end point \\

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data:" + err);
    })
    .sort({ createdAt: -1 });
};
// create post end point => multer middleware : picture.post \\

exports.createPost = async (req, res) => {
//  const followingIdArray = []
//  const followerIdArray = []
//  let test = ""
//  UserModel.find({following : req.body.posterId})
//   .then((post)=>{
//     post.forEach(id=> {
//       const IdFollowing = id._id.toString()
//       followingIdArray.push(IdFollowing)     
//     });  
//   })
// UserModel.find({followers : req.body.posterId})
//   .then((post)=>{
//     post.forEach(id=> {     
//       //  test = id._id.toString() 
//       // followerIdArray.push(IdFollower)     
//     });  
//   })
  const date = new Date(Date.now())
  const days = date.toLocaleDateString()
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const finalDate = `posté le ${days} à ${hours}h${minutes}`
  const followerIdArray = req.body.posterFollower.split(",")
  const followingIdArray = req.body.posterFollowing.split(",")
 
  const newPost = new PostModel({
    posterId: req.body.posterId,
    posterfirstname : req.body.posterfirstname,
    posterlastname : req.body.posterlastname,
    posterfullname : req.body.posterfullname,
    posterpicture : req.body.posterpicture,
    posterrole : req.body.role,
    message: req.body.message,
    picture: req.file != null ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "",
    video: req.body.video,
    likers: [],
    comments: [],
    date : finalDate,
    posterfollower : followerIdArray != null ? followerIdArray : [],
    posterfollowing : followingIdArray != null ? followingIdArray : [],
    
    // posterfollower : req.body.posterFollower
   
    
  });
  try {
    post = await newPost.save();
    // console.log(post);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};


// update post end point \\
exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id) ) {return res.status(400).send("post inconuu:" + req.params.id);}
  PostModel.findById(req.params.id)
  .then((post) => {
    // console.log(req);
    const postedBy = post.posterId
    const connectedUser = req.user
    // console.log( "up"+post.posterId);
    // console.log("up"+ req.user);
    if(connectedUser !== '62f8f745c348ae5b9f081062'  &&  postedBy !== connectedUser){
      // res.cookie('jwt','', { session:false, maxAge: 1 }) 
      res.status(400).json('delete')
}else{
  const date = new Date(Date.now())
  const days = date.toLocaleDateString()
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const finalDate = `modifié le ${days} à ${hours}:${minutes}`
const updatedRecord = {
  // posterId: req.body.posterId,
  // posterpicture : req.body.photo,
  message: req.body.message,
  picture:
    req.file != null
      ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      : `${req.body.file}`,
      date : finalDate,
}
PostModel.findByIdAndUpdate(req.params.id,
  { $set: updatedRecord },
  { new: true },
  (err, docs) => {
    if (!err) res.send(docs);
    else console.log("petit probleme : " + err)});
  }
})
};



exports.updatePictureUserPost = async (req, res) => {
//  console.log(req);
  // if (!ObjectID.isValid(req.params.id) ) {return res.status(400).send("post inconuu:" + req.params.id);}
//   PostModel.findById(req.params.id)
//   .then((post) => {
//     const postedBy = post.posterId
//     const connectedUser = req.user
//     // console.log( "up"+post.posterId);
//     // console.log("up"+ req.user);
//     if(connectedUser !== '62f8f745c348ae5b9f081062'  &&  postedBy !== connectedUser){
//       // res.cookie('jwt','', { session:false, maxAge: 1 }) 
//       res.status(400).json('delete')
// }else{
const updatedRecord = 
{
  posterpicture :   req.file != null
  ? `${req.protocol}://${req.get("host")}/images/default/${req.file.filename}`
  : ``, 
}
PostModel.findByIdAndUpdate(req.params.id,
  { $set: updatedRecord },
  { new: true },
  (err, docs) => {
    if (!err) res.send(docs);
    else console.log("petit probleme : " + err)});
  }
// })
// };

exports.getOnePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.findById(req.params.id)
   .then((post)=>{
    res.status(200).json(post);
   }).catch((err)=>{
    res.status(401).json(err);
   })
};

exports.getPostByPosterid= (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({posterId : req.params.id})
   .then((post)=>{
    console.log(req.params)
    // post.sort({ createdAt: -1 })
    res.status(200).json(post);
   }).catch((err)=>{
    res.status(401).json(err);
   })
};

exports.getPostLike= (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({likers :  req.params.id} )
   .then((post)=>{
    console.log(req.params)
    // post.sort({ createdAt: -1 })
    res.status(200).json(post);
   }).catch((err)=>{
    res.status(401).json(err);
   })
};

exports.getPostFollowing= async (req, res) => {
 
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
 await PostModel.find({posterfollowing : req.params.id}) 
 .then((post)=>{
  // post.sort({ createdAt: -1 })
  console.log(post);
  res.status(200).json(post);
 })
  







   .catch((err)=>{ res.status(401).json(err);})
//  await UserModel.find({followers : req.params.id}) 
//    .then((post)=>{
//     // console.log(post);
  
//     post.forEach((idpost)=>{
//         // console.log(idpost);
//       let id = idpost._id.toString()
//           // console.log(id); 
//         PostModel.find({posterId : id})
//           .then((test)=>{ Array.push(test)
//         // console.log(Array)
//         res.status(201).json(Array)
//     })
   
//     })
    
//    })
//    .catch((err)=>{ res.status(401).json(err);})
};

exports.getPostFollower= (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({posterfollower : req.params.id})  
   .then((post)=>{
    // post.sort({ createdAt: -1 })
    console.log(req.params)
    res.status(200).json(post);
   }).catch((err)=>{
    res.status(401).json(err);
   })
};

exports.getPostSignal= (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({posterId : req.params.id}) 
   .then((post)=>{
    console.log(req.params)
    res.status(200).json(post);
   }).catch((err)=>{
    res.status(401).json(err);
   })
};

// delete post end point \\
exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    PostModel.findById(req.params.id)
    .then((post)=>{
      // console.log(req.user);
      const postedBy = post.posterId
      const connectedUser = req.user
      // console.log("del"+postedBy);
      // console.log( "del"+req.user);
      if(connectedUser !== '62f8f745c348ae5b9f081062' && postedBy !== connectedUser){
        res.cookie('jwt','', { session:false, maxAge: 1 }) 
        res.status(400).json('nocookie')
  }else{
      let delimg = post.picture.split('images/')[1]
      fs.unlink(`images/${delimg}`,()=> {
        PostModel.findByIdAndRemove(req.params.id, (err, docs)=> {
          // console.log(req);
      if(!err){
        res.status(200).json(docs);
      }else{
        res.status(400).send(err);}
        })
      })
    }
    }).catch((err)=>{err})
}; 

// delete picture end point \\

exports.deleteOnePicture = (req, res) => {
    PostModel.findById(req.params.id)
    .then((post)=>{
      const postedBy = post.posterId
      const connectedUser = req.user
      // console.log(post);
      // console.log("on"+postedBy);
      // console.log( "on"+req.user);
      if(connectedUser !== '62f8f745c348ae5b9f081062'  &&  postedBy !== connectedUser){
        res.cookie('jwt','', { session:false, maxAge: 1 }) 
        res.status(400).json('onepic')
  }else{
        // console.log(post);
      let delimg = post.picture.split('images/')[1]
      // console.log(delimg);
    
        fs.unlink(`images/${delimg}`, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');                                
        }
        });}  
    }).catch((err)=>{err})
  };


exports.deleteOldPicModidify = (req, res) => {
    PostModel.findById(req.params.id)
    .then((post)=>{
     
      // const postedBy = post.posterId
      // const connectedUser = req.user
      // if(connectedUser !== '62f8f745c348ae5b9f081062'  &&  postedBy !== connectedUser){
      //   res.cookie('jwt','', { session:false, maxAge: 1 }) 
      //   res.status(400).json('moddelpic')
  // }else{
        // console.log(req.body.id);
       old = req.body.id
      let delimg = old.split('images/')[1]
      console.log(delimg);
    
        fs.unlink(`images/${delimg}`, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');                                
        }
        });
      // }  
    }).catch((err)=>{err})
  };
 


// like post end point \\
exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("post iconnu:" + req.params.id);
  try {
      // console.log(req.params.id),
      // console.log(req.body.id),
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: {
          likers: req.body.id,
        },
      },
      (err, docs) => {
        if (err) {
          return res.status(400).send(err.message);
        }
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id},
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send('post liker');
        else return res.status(400).send(err.message);
      }
    );
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// unlike post end point \\
exports.unLikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  try {
    PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          likers: req.body.id,
        },
      },
      (err, docs) => {
        if (err) {
          return res.status(400).send(err.message);
        }
      }
    );
    UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else return res.status(400).send(err.message);
      }
    );
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// commentpost end point \\
exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamp: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};

// editCommentpost end point \\
exports.editCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      // console.log(Comment);
      const Comment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );

      if (!Comment) return res.status(404).send("Commentaire non trouver");
      Comment.text = req.body.text;
      return docs.save((err) => {
        if (!err) return res.status(200).send(docs);
        return res.status(500).send(err.message);
      });
    });
  } catch (err) {
    return res.status(400).send(err.message);
  }
};

// deleteCommentpost end point \
exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);

  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) return res.send(docs);
        else return res.status(400).send(err);
      }
    );
  } catch (err) {
    return res.status(400).send(err);
  }
};
