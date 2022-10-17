const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { connected } = require("process");

// all user end point \\

exports.getAllUsers = async (req, res) => {
  // const badge =  await UserModel.find().select("-badge");
  const users = await UserModel.find().select("-password").select("-badge");

  res.status(200).json(users);
};

// user info end point \\

exports.userInfo = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("utilisateur inconnu: " + err);
  })
    .select("-password")
    .select("-badge");
};

// update user end point \\

exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);

  const updatedData = {
    bio: req.body.bio,
    photo:
      req.file != null
        ? `${req.protocol}://${req.get("host")}/images/default/${req.file.filename}`: ``,
  };

  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $set: updatedData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.send(docs))
      .catch((err) => res.status(500).send({ message: err }));
    // (err, docs)=>{
    //   if(!err) return res.status(201).send(docs);
    //   else return res.status(500).send({message : err})
    // }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
};


// user delete end point \\

exports.userDelete = async (req, res) => {
  console.log(req.body.idrequest);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  // try {
    await UserModel.findById(req.params.id, (err, docs) => {
      let token = req.cookies.jwt;
      jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log("no token");
        } else {
          let connectedUser = docs._id.toString().split('new ObjectId("')[0];
          let jwtToken = decodedToken.id;
          // console.log(connectedUser);
          // console.log(jwtToken);
          if (
            jwtToken !== "62f8f745c348ae5b9f081062" &&
            jwtToken !== connectedUser
          ) {
            return res.cookie("jwt", "", { session: false, maxAge: 1 });
            
          } else {
            console.log("ok");
            let delimg = docs.photo.toString().split("images/default/")[1];
            if (delimg != '') {
              fs.unlink(`images/default/${delimg}`, (err) => {
                if (err) console.log(err);
                else {
                  console.log("photo supprimer");
                }
              });
            } else console.log("utilisateur inconnu: " + err);
          }
        }
      });
      
           
     UserModel.deleteOne(req.body.idrequest )
      
      .exec()
      .then((doc)=>{
        if(!doc){ return res.stauts(404).end()}
      return res.status(200).json({ message: "utilisateur supprimer." }).end();
    })
  })
  // } 
  // catch (err) {
  //   res.status(400).send({ message: err });
  // }
};

// follow user  end point \\

exports.follow = async (req, res) => {
  if ( !ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToFollow) )
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    console.log(req.params.id);
    console.log(req.body.idToFollow);
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.status(201).json(docs))
      .catch((err) => res.status(400).json({ message: err }));
  
    await UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).json({ message: err }));

    await PostModel.findOneAndUpdate({posterId : req.body.idToFollow},
      {$push :{ posterfollower : req.params.id } },
      // { new: true, upsert: true }
      )
      .catch((err) => res.status(400).json({ message: err }));
    await PostModel.findOneAndUpdate({posterId : req.params.id},
      {$push :{ posterfollowing : req.body.idToFollow}},
      // { new: true, upsert: true }
      )
      .catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });}
    //   .then((doc)=>{
  //     PostModel.updateMany(req.body.idToFollow,
  //  {$addToSet :{ posterfollower : req.params.id } },
  //     { multi: true, upsert: true }
  //     )
  //     console.log(doc)
  //   }) 
    // .then((docs) => res.status(201).json(docs))
};

// unfollow user end point \\

exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    console.log(req.params.id);
    console.log(req.body.idToUnFollow);
  try {
    await UserModel.findByIdAndUpdate(req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      // { new: true, upsert: true }
    ).then((docs) =>  res.status(201).json(docs))
      .catch((err) => res.status(400).json({ message: err }));
    await UserModel.findByIdAndUpdate( req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      // { new: true, upsert: true }
    ).catch((err) => res.status(400).json({ message: err }));
    await PostModel.findOneAndUpdate({posterId : req.body.idToUnFollow},
      {$pull:{ posterfollower : req.params.id } },
      // { multi: true, upsert: true }
      ).catch((err) => res.status(400).json({ message: err }));
    await PostModel.findOneAndUpdate({posterId : req.params.id},
      {$pull:{ posterfollowing : req.body.idToUnFollow}},
      // { multi: true, upsert: true }
      ).catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
