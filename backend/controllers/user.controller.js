const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers =async (req,res)=>{

const users = await UserModel.find().select('-password');
console.log(users);
res.status(200).json(users);
}

module.exports.userInfo = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id)

    UserModel.findById(req.params.id, (err, docs)=>{
        if(!err) res.send(docs);
        else console.log('utilisateur inconnu: '+ err);
    }).select('-password')
};

module.exports.updateUser = async (req,res)=>{
    if(!ObjectID.isValid(req.params.id))
    return res.status(400).send('utilsateur inconnu :'+ req.params.id)
  
  try {
    await UserModel.findOneAndUpdate(
        {_id:req.params.id},
         {
            bio: req.body.bio
        },
        {  new: true, upsert: true, setDefaultsOnInsert: true },
    )
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err })
        // (err, docs)=>{
        //   if(!err) return res.status(201).send(docs);
        //   else return res.status(500).send({message : err})
        // }
    )
  } catch (err){
    return res.status(403).json({message : err});
  }
  };