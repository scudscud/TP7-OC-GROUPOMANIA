const postModel = require('../models/post.model');
const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const { uploadErrors } = require("../utils/errors.utils");

exports.readPost = (req, res)=> {
    postModel.find((err, docs)=>{
        if (!err) res.send(docs);
        else console.log('Error to get data:' + err);
    }).sort({ createdAt: -1 });
}

exports.createPost = async (req,res) => { 
    let fileName;
    if (req.file = null) {
        try{
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
          )
            throw Error("invalid file");
          if (req.file.size > 500000) throw Error("image trop grande");
        } catch (err) {
          const errors = uploadErrors(err);
          return res.status(201).json({ errors });
        }
        const fileName = req.body.posterId + Date.now() + '.jpg';
        await pipeline(
            req.file.stream,
            fs.createWriteStream(`${_dirname}/../static/${fileName}`))
    }
    const newPost = new PostModel({
        posterId: req.body.posterId,
        message: res.body.message,
        picture: req.file = null ? "./uploads/posts" + fileName: "",
        video: req.body.video,
        likers: [],
        comments: []
    });
try {
    post = await newPost.save();
    return res.status(201).json(post);
} catch (err){
return res.status(400).send(err.message);
}
};

exports.updatePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);
    const updatedRecord = {
        message: req.body.message
    }
    PostModel.findByIdAndUpdate(
        req.params.id,
        { $set: updatedRecord},
        {new: true},
        (err, docs)=> {
            if(!err) res.send(docs);
            else console.log('petit probleme : '+ err);
        }
    )
};

exports.deletePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);

    PostModel.findByIdAndRemove(
        req.params.id,
        (err,docs) => {
            if(!err) res.send(docs);
            else console.log('delete error : '+ err);
        }
    );

};

exports.likePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);

    try {
         PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $addToSet :{
                    likers : req.body.id }
                },
                (err ,docs) => {
                    if (err) {return res.status(400).send(err.message)}
                  
                    }
        );
         UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $addToSet : {likes : req.params.id},
            },
            {new:true },
            (err,docs)=>{
                if (!err) res.send(docs);
                else return res.status(400).send(err.message);
            }
        );
    } catch (err) {
        return res.status(400).send(err.message)
    }
};

exports.unLikePost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);

    try {
         PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull :{
                    likers : req.body.id }
                },
                (err ,docs) => {
                    if (err) {return res.status(400).send(err.message)}
                  
                    }
        );
         UserModel.findByIdAndUpdate(
            req.body.id,
            {
                $pull : {likes : req.params.id},
            },
            {new:true },
            (err,docs)=>{
                if (!err) res.send(docs);
                else return res.status(400).send(err.message);
            }
        );
    } catch (err) {
        return res.status(400).send(err.message)
    }
};



// exports.unLikePost = async (req,res)=>{
//     if(!ObjectID.isValid(req.params.id))
//     return res.status(400).send('utilsateur inconnu :'+ req.params.id)

//  .then( await PostModel.findByIdAndUpdate(req.params.id,{$pull : { likers : req.body.id}},
//     (err,docs) => {
//         if (err) return res.status(400).send(err.message)
       
//     };
// )).then( await UserModel.findByIdUpdate(
//     req.body.id,
//     {
//         $pull : {likes: req.params.id}
//     },
//     { new: true},
//     (err,docs)=> {
//         if (!err) res.send(docs);
//         else return res.status(400).send(err.message)
//     }
// )).catch(err => res.status(400).send(err.message))
// };


exports.commentPost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);

    try{
        return PostModel.findByIdAndUpdate(
            req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commenterPseudo: req.body.commenterPseudo,
                        text: req.body.text,
                        timestamp: new Date().getTime()
                    }
                }
            },
            {new:true},
            (err,docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err);
            }
        )
    } catch (err) {
        return res.status(400).send(err);

    }
};

exports.editCommentPost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);
    try {
        return PostModel.findById(req.params.id,(err, docs) => {
                // console.log(Comment);
                const Comment = docs.comments.find((comment) =>
                comment._id.equals(req.body.commentId)
                )

                if (!Comment) return res.status(404).send('Commentaire non trouver')
                Comment.text = req.body.text;

                return docs.save((err)=>{
                    if (!err) return res.status(200).send(docs);
                    return res.status(500).send(err.message);
                })
            }
        )
    } catch (err) {
        return res.status(400).send(err.message);

    }
};


exports.deleteCommentPost = (req,res) => {
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id);

    try {
        return postModel.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {
                    comments: {
                        _id: req.body.commentId
                    }
                }
            },
            { new:true},
            (err,docs) => {
                if (!err) return res.send(docs);
                else return res.status(400).send(err)
            }
        )
    }catch (err) {
        return res.status(400).send(err);
    }
};