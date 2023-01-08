// const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const SignalModel = require("../models/signal.model");
const CommentModel = require("../models/comment.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");


// read post end point \\

exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};
// create post end point => multer middleware : picture.post \\

exports.createPost = async (req, res) => {
  if (!ObjectID.isValid(req.user))
  return res.status(400).send("utilsateur inconnu :" + req.user)
  UserModel.findById(req.user).then((doc)=>{
    if(!doc) res.status(400).send('utilisateur inconnu')})
  const connectedUser = req.user
  const postedBy = req.body._id
  if (req.role === 'admin'|| connectedUser === postedBy) {
  }else {
    const date = new Date(Date.now());
  const days = date.toLocaleDateString();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const finalDate = `posté le ${days} à ${hours}h${minutes}`;
  const followerIdArray = req.body.posterFollower.split(",");
  const followingIdArray = req.body.posterFollowing.split(",");

  const newPost = new PostModel({
    posterId: req.body.posterId,
    posterfirstname: req.body.posterfirstname,
    posterlastname: req.body.posterlastname,
    posterfullname: req.body.posterfullname,
    posterpicture: req.body.posterpicture,
    posterrole: req.body.role,
    message: req.body.message,
    picture:
      req.file != null
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : "",
    video: req.body.video,
    likers: [],
    comments: [],
    date: finalDate,
    posterfollower: followerIdArray != null ? followerIdArray : [],
    posterfollowing: followingIdArray != null ? followingIdArray : [],
  });
  try {
    post = await newPost.save();
    // console.log(post);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err.message);
  }
  }
  res.cookie('jwt','', { session:false, maxAge: 1 })
  res.status(400).json("erreur d'utlisateur");
  
  
};

// update post end point \\

exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("post inconuu:" + req.params.id);
  }
  PostModel.findById(req.params.id).then((post) => {
    const postedBy = post.posterId;
    const connectedUser = req.user;
    if (req.role === 'admin'|| connectedUser === postedBy) {
      const date = new Date(Date.now());
      const days = date.toLocaleDateString();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const finalDate = `modifié le ${days} à ${hours}:${minutes}`;
      const updatedRecord = {
        message: req.body.message,
        picture:
          req.file != null
            ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
            : `${req.body.file}`,
        date: finalDate,
      };
      PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord },
        { new: true },
        (err, docs) => {
          if (!err) res.send(docs);
          else console.log("petit probleme : " + err);
        }
      );
    } else { 
      res.cookie('jwt','', { session:false, maxAge: 1 })
      res.status(400).json("expulsion");
    }
  });
};

exports.updatePictureUserPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) ) {return res.status(400).send("post inconu:" + req.params.id);}
    PostModel.findById(req.params.id)
    .then((post) => {
  const postedBy = post.posterId;
  const connectedUser = req.user;
  if (req.role === 'admin'|| connectedUser === postedBy) {
    const updatedRecord = {
      posterpicture:
        req.file != null
          ? `${req.protocol}://${req.get("host")}/images/default/${
              req.file.filename
            }`
          : ``,
    };
    PostModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedRecord },
      { new: true },
      (err, docs) => {
        if (!err) res.send(docs);
        else console.log("petit probleme : " + err);
      }
    );
  } else {
    res.status(400).json("erreur de droit");
  }
  })
};

exports.getOnePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("publication inconnu :" + req.params.id);
  PostModel.findById(req.params.id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

exports.getPostByPosterid = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({ posterId: req.params.id }, (err, doc) => {
    if (!err) res.send(doc);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};


exports.getPostLike = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({ likers: req.params.id }, (err, doc) => {
    if (!err) res.send(doc);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};



exports.getPostFollowing = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({ posterfollowing: req.params.id }, (err, doc) => {
    if (!err) res.send(doc);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};


exports.getPostFollower = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.find({ posterfollower: req.params.id }, (err, doc) => {
    if (!err) res.send(doc);
    else console.log("Error to get data:" + err);
  }).sort({ createdAt: -1 });
};

exports.getPostSignalAdmin = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("Utilisateur inconnu : " + req.params.id);
  }
  if (req.role !== 'admin' ) {return res.status(400).json("tu n'est pas l'admin")}
else{
  try {
    const docs = await PostModel.find({ signalBy: { $gte: 1 } }).sort({ signalpost: -1 });
    res.send(docs);
  } catch (err) {
    res.status(400).send("Erreur : " + err);
    }
  }
}; 

exports.getPostSignal = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("publication inconnu:" + req.params.id);
    if(req.body.userFromId !== req.user ) return res.status(400).send("erreur sur l'utilisateur");
  PostModel.findById(req.params.id)
    .then((doc) => {
      const verifynotreport = doc.signalBy;
      if (doc.signalBy.includes(req.user)) {
        console.log("publication deja sgnaler");
      } else {
        const postSignal = doc;
        const date = new Date(Date.now());
        const days = date.toLocaleDateString();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const finalDate = `signalé le ${days} à ${hours}h${minutes}`;
        const signal = {
          signalByFullname: req.body.userFromFullname,
          signalById: req.body.userFromId,
          sinalUserFullname: req.body.userSignalFullname,
          signalUserId: req.body.userSignalId,
          signalPostId: req.body.postSignal,
          date: finalDate,
        };
        PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              signalpost: signal,
            },
            $addToSet: {
              signalBy: req.body.userFromId,
            },
          },
          { new: true },
          (err, doc) => {
            if (err) res.status(401).json(err);
          }
        );
        const newSignal = new SignalModel({
          signalByFullname: req.body.userFromFullname,
          signalById: req.body.userFromId,
          signalUserFullname: req.body.userSignalFullname,
          signalUserId: req.body.userSignalId,
          signalPostId: req.body.postSignal,
          date: finalDate,
          post: postSignal,
        });
        try {
          const signalRecord = newSignal.save();
        } catch (err) {
          res.status(400).send(err);
        }
        const signalUser = {
          signalPostId : req.body.postSignal,
          signalUserId : req.body.userFromId ,
          date: finalDate,  
        }
        UserModel.findById(req.body.userSignalId,{postSignalBy:
          {$elemMatch :
            {signalPostid :req.body.postSignal, signalUserId : req.body.userFromId}}},(err,doc)=>{
              console.log(doc.postSignalBy[0]);
           if (doc.postSignalBy[0] != undefined ) console.log('publication deja signalé')
           else {
           UserModel.findByIdAndUpdate(req.body.userSignalId,
              { $push: {postSignalBy : signalUser}},
              (err,doc)=>{ 
                if (err) res.status(400).json(err)
                else console.log("c'est ok '" + doc);
              })
            }
        })
      }
    })
    .catch((err) => {
      res.status(401).json(err);
    });
};

// delete post end point \\
exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("post inconnu :" + req.params.id);
    if (!ObjectID.isValid(req.body.id))
    return res.status(400).send("utilisateur inconnu:" + req.body.id);
  PostModel.findById(req.params.id)
    .then((post) => {
      const postedBy = post.posterId;
      const connectedUser = req.user;
      if (req.role == 'admin' || connectedUser === postedBy) {
        let delimg = post.picture.split("images/")[1];
        fs.unlink(`images/${delimg}`, () => {
          PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
            if (!err) {
              res.status(200).json(docs);
            } else {
              res.status(400).send(err);
            }
          });
        });
      } else {
        res.cookie('jwt','',{ExpiresIn:1}).status(400).json("erreur de personne")
      }
    })
    .catch((err) => {
      err;
    });
};

// delete picture end point \\

exports.deleteOnePicture = (req, res) => {
  PostModel.findById(req.params.id)
    .then((post) => {
      const postedBy = post.posterId;
      const connectedUser = req.user;
      if (req.role === 'admin' || connectedUser === postedBy) {
        let delimg = post.picture.split("images/")[1];
        fs.unlink(`images/${delimg}`, (err) => {
          if (err) {
            console.log("failed to delete local image:" + err);
          } else {
            console.log("successfully deleted local image");
          }
        });
      } else {
        res.cookie("jwt", "", { session: false, maxAge: 1 })
        res.status(400).json("erreur onepic")
      }
    })
    .catch((err) => {
      err;
    });
};

exports.deleteOldPicModidify = (req, res) => {
  PostModel.findById(req.params.id)
    .then((post) => {
      const postedBy = post.posterId
      const connectedUser = req.user
      if (req.role === 'admin'|| connectedUser === postedBy) {
        old = req.body.id;
        let delimg = old.split("images/")[1];
  
        fs.unlink(`images/${delimg}`, (err) => {
          if (err) {
            console.log("failed to delete local image:" + err);
          } else {
            console.log("successfully deleted local image");
          }
        });
      }else{
        res.cookie("jwt", "", { session: false, maxAge: 1 });
        res.status(400).json("erreur onepicuser");
      }
    })
    .catch((err) => {
      err;
    });
};

// like post end point \\
exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("post iconnu:" + req.params.id);
  if (!ObjectID.isValid(req.body.id))
    return res.status(400).send("utilisateur inconnu:" + req.params.id);
  if (req.user === req.body.id || req.role === 'admin' ) { 
    PostModel.find({ _id: req.params.id, likers: req.body.id },(err,doc)=>{
      if ( doc[0] != undefined) {
        res.status(400).json('publication deja liker')
      } else {
      try {
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
            $addToSet: { likes: req.params.id },
          },
          { new: true },
          (err, docs) => {
            if (!err) res.json("post liker");
            else return res.status(400).send(err.message);
          }
        );
      } catch (err) {
        return res.status(400).send(err.message);
      }
    }
      })
  }else{
    res.cookie('jwt','',{maxAge: 1 }).status(404).json("erreur d'utilisateur")    
  }
};

// unlike post end point \\
exports.unLikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    if (req.user === req.body.id || req.role === 'admin' ) {
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
            if (!err) res.json('unlike ok ');
            else return res.status(400).send(err.message);
          }
        );
      } catch (err) {
        return res.status(400).send(err.message);
      }
    } else {
    res.cookie('jwt','',{maxAge:1})
    res.status(400).json("erreur de user")
}
};

// commentpost end point \\
exports.commentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    res.status(400).send("publication inconnu :" + req.params.id);
    const postedBy = req.body.commenterId
    if(postedBy !== req.user){
      res.cookie('jwt','',{maxAge:1}).status(400).json("erreur d'utilisateur")
    }else{
  PostModel.findById(req.params.id)
    .then((post) => {
      const postRecord = post;
      try {
        const date = new Date(Date.now());
        const days = date.toLocaleDateString();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const finalDate = `commenté le ${days} à ${hours}:${minutes}`;
        PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $push: {
              comments: {
                postCommentId: req.body.postCommentId,
                commenterId: req.body.commenterId,
                commenterFirstname: req.body.commenterFirstname,
                commenterLastname: req.body.commenterLastname,
                commenterFullname: req.body.commenterFullname,
                commenterPicture: req.body.commenterPicture,
                comment: req.body.comment,
                commentLikers: req.body.commentLikers,
                commentDate: finalDate,
              },
            },
          },
          { new: true },
          (err, docs) => {
            if (err) res.send(err);
          }
        );
        const newComment = new CommentModel({
          postCommentId: req.body.postCommentId,
          commenterId: req.body.commenterId,
          commenterFirstname: req.body.commenterFirstname,
          commenterLastname: req.body.commenterLastname,
          commenterFullname: req.body.commenterFullname,
          commenterPicture: req.body.commenterPicture,
          commentLikers: req.body.commentLikers,
          commentDate: finalDate,
          comment: req.body.comment,
          post: postRecord,
        });
        try {
          const CommentRecord = newComment.save();
        } catch (err) {
          res.status(400).send(err);
        }
        UserModel.findByIdAndUpdate(
          req.user,
          {
            $addToSet: {
              comments: {
                postCommentId: req.body.postCommentId,
                commenterId: req.body.commenterId,
                commenterFirstname: req.body.commenterFirstname,
                commenterLastname: req.body.commenterLastname,
                commenterFullname: req.body.commenterFullname,
                commenterPicture: req.body.commenterPicture,
                commentLikers: req.body.commentLikers,
                comment: req.body.comment,
                commentDate: finalDate,
              },
            },
          },
          { new: true },
          (err, docs) => {
            if (err) res.send(err);
            // if (!err) return res.send(docs);
            // else return res.status(400).send(err);
          }
        );
      } catch (err) {
        res.status(400).send(err);
      }
      res.status(200).json("commentaire envoyer");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
  }
};

//---------------------------end non implant ------------\\

// editCommentpost end point \\
// exports.editCommentPost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("utilsateur inconnu :" + req.params.id);
//   try {
//     return PostModel.findById(req.params.id, (err, docs) => {
//       // console.log(Comment);
//       const Comment = docs.comments.find((comment) =>
//         comment._id.equals(req.body.commentId)
//       );

//       if (!Comment) return res.status(404).json("Commentaire non trouver");
//       Comment.text = req.body.text;
//       return docs.save((err) => {
//         if (!err) return res.status(200).send(docs);
//         return res.status(500).send(err.message);
//       });
//     });
//   } catch (err) {
//     return res.status(400).send(err.message);
//   }
// };

// // deleteCommentpost end point \
// exports.deleteCommentPost = (req, res) => {
//   if (!ObjectID.isValid(req.params.id))
//     return res.status(400).send("utilsateur inconnu :" + req.params.id);

//   try {
//     return PostModel.findByIdAndUpdate(
//       req.params.id,
//       {
//         $pull: {
//           comments: {
//             _id: req.body.commentId,
//           },
//         },
//       },
//       { new: true },
//       (err, docs) => {
//         if (!err) return res.send(docs);
//         else return res.status(400).send(err);
//       }
//     );
//   } catch (err) {
//     return res.status(400).send(err);
//   }
// };
