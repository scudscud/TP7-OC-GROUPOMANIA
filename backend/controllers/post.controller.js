const postModel = require("../models/post.model");
const PostModel = require("../models/post.model");
const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require('fs');
let path = require('path');

// read post end point \\

exports.readPost = (req, res) => {
  postModel
    .find((err, docs) => {
      if (!err) res.send(docs);
      else console.log("Error to get data:" + err);
    })
    .sort({ createdAt: -1 });
};


// create post end point => multer middleware : picture.post \\

exports.createPost = async (req, res) => {
   console.log(req.body.role);
  //  console.log(req.file);
  const date = new Date(Date.now())
  const days = date.toLocaleDateString()
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const finalDate = `posté le ${days} à ${hours}:${minutes}`

  const newPost = new PostModel({
    posterId: req.body.posterId,
    posterfirstname : req.body.posterfirstname,
    posterlastname : req.body.posterlastname,
    posterfullname : req.body.posterfullname,
    posterpicture : req.body.posterpicture,
    posterrole : req.body.role,
    message: req.body.message,
    picture:
      req.file != null
        ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
        : "",
    video: req.body.video,
    likers: [],
    comments: [],
    date : finalDate,
  });
  try {
    post = await newPost.save();
    console.log(post);
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err.message);
  }
};


// update post end point \\
exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  const updatedRecord = {
    message: req.body.message,
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
};

exports.onePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findById(req.params.id)
   .then((post)=>{
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
      let delimg = post.picture.split('images/')[1]
       fs.unlink(`images/${delimg}`,()=> {
        PostModel.findByIdAndRemove(req.params.id, (err, docs)=> {
      if(!err){
        res.status(200).json(docs);
      }else{
        res.status(400).send(err);
      }
        })
      })
    }).catch((err)=>{err})
    // console.log(delimg);
    // console.log(post.picture);
    // console.log(post);

  // PostModel.findByIdAndRemove(req.params.id ,(err, docs) => {
  //   // console.log(req);
  //   // console.log(res);
  //   if (!err) {
     
  //     res.send(docs)
  //   }
  //   else console.log("delete error : " + err)
  // });
};

// like post end point \\
exports.likePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);

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
        if (!err) res.send(docs);
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
    return postModel.findByIdAndUpdate(
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
