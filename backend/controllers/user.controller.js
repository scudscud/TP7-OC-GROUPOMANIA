const UserModel = require("../models/user.model");
const ObjectID = require("mongoose").Types.ObjectId;

// all user end point \\

exports.getAllUsers = async (req, res) => {
  // const badge =  await UserModel.find().select("-badge");
  const users = await UserModel.find().select("-password").select('-badge');
  // console.log(users);
  res.status(200).json(users);
};

// user info end point \\

exports.userInfo = async (req, res) => {

  console.log(req.params);
  if (!ObjectID.isValid(req.params.id)) return res.status(400).send("utilsateur inconnu :" + req.params.id);

  UserModel.findById(req.params.id, (err, docs) => {
  
    if (!err) res.send(docs);


    else console.log("utilisateur inconnu: " + err);
  }).select("-password").select('-badge');
};

// update user end point \\

exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        bio: req.body.bio,
      },
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
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  try {
    // console.log(req.params.id);
    await UserModel.deleteOne({ _id: req.params.id }).exec();
    res.status(200).json({ message: "utilisateur supprimer." });
  } catch (err) {
    res.status(400).send({ message: err });
  }
};

// follow user  end point \\

exports.follow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToFollow)
  )
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
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
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// unfollow user end point \\

exports.unfollow = async (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
  try {
    await UserModel.findByIdAndUpdate(
      req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      { new: true, upsert: true }
    )
      .then((docs) => res.json(docs))
      .catch((err) => res.status(400).json({ message: err }));

    await UserModel.findByIdAndUpdate(
      req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
