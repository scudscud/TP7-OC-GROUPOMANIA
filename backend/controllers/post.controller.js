// const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const SignalModel = require("../models/signal.model");
const CommentModel = require("../models/comment.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
let path = require("path");
// const { log } = require("console");

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
  if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
    res.cookie('jwt','', { session:false, maxAge: 1 })
    res.status(400).json("erreur");}
  
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
};

// update post end point \\

exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send("post inconuu:" + req.params.id);
  }
  PostModel.findById(req.params.id).then((post) => {
    const postedBy = post.posterId;
    const connectedUser = req.user;
    if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
      res.cookie('jwt','', { session:false, maxAge: 1 })
      res.status(400).json("delete");
    } else {
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
    }
  });
};

exports.updatePictureUserPost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id) ) {return res.status(400).send("post inconu:" + req.params.id);}
    PostModel.findById(req.params.id)
    .then((post) => {
  const postedBy = post.posterId;
  const connectedUser = req.user;
  if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
    // res.cookie('jwt','', { session:false, maxAge: 1 })
    res.status(400).json("delete");
  } else {
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

exports.getPostSignalAdmin = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    console.log(req.user);
  PostModel.find({ signalBy: {$gte : 1}},(err, doc) => {
  if(!err)res.send(doc)
  else res.status(400).send('erreur la ')
  }).sort({ createdAt: -1 });
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
        UserModel.findById(req.body.userSignalId,{signalBy:req.body.userSignalId},(err,doc)=>{
           if (doc[0] !== null ) console.log('utilisateur deja signaler')
           else {
           UserModel.findByIdAndUpdate(req.body.userSignalId,
              { $push: {signalBy : req.body.userFromId}},
              (err,doc)=>{ if (err) res.status(400).json(err)})
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
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  PostModel.findById(req.params.id)
    .then((post) => {
      const postedBy = post.posterId;
      const connectedUser = req.user;
      if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
        res.cookie("jwt", "", { session: false, maxAge: 1 });
        res.status(400).json("nocookie");
      } else {
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
      if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
        res.cookie("jwt", "", { session: false, maxAge: 1 });
        res.status(400).json("onepic");
      } else {
        let delimg = post.picture.split("images/")[1];
        fs.unlink(`images/${delimg}`, (err) => {
          if (err) {
            console.log("failed to delete local image:" + err);
          } else {
            console.log("successfully deleted local image");
          }
        });
      }
    })
    .catch((err) => {
      err;
    });
};

exports.deleteOldPicModidify = (req, res) => {
  PostModel.findById(req.params.id)
    .then((post) => {
      // const postedBy = post.posterId
      // const connectedUser = req.user
      // if(connectedUser !== '62f8f745c348ae5b9f081062'  &&  postedBy !== connectedUser){
      //   res.cookie('jwt','', { session:false, maxAge: 1 })
      //   res.status(400).json('moddelpic')
      // }else{
      // console.log(req.body.id);
      old = req.body.id;
      let delimg = old.split("images/")[1];

      fs.unlink(`images/${delimg}`, (err) => {
        if (err) {
          console.log("failed to delete local image:" + err);
        } else {
          console.log("successfully deleted local image");
        }
      });
      // }
    })
    .catch((err) => {
      err;
    });
};

// like post end point \\
exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("post iconnu:" + req.params.id);
    if (req.user !== req.body.id) return res.status(400).send("erreur de user");
    PostModel.find({ _id: req.params.id, likers: req.body.id },(err,doc)=>{
      console.log(doc[0]);
      console.log(err);
    if ( doc[0] != undefined)  res.status(400).json('publication deja liker')
    else {
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
          if (!err) res.send("post liker");
          else return res.status(400).send(err.message);
        }
      );
    } catch (err) {
      return res.status(400).send(err.message);
    }
  }

    })
 
};

// unlike post end point \\
exports.unLikePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    if (req.user !== req.body.id) return res.status(400).json("erreur de user");
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
    res.status(400).send("publication inconnu :" + req.params.id);
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
            // if (!err)  res.send(docs);
            // else res.status(400).send(err);
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
      res.status(200).send("allgood");
    })
    .catch((err) => {
      res.status(400).send(err);
    });
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
