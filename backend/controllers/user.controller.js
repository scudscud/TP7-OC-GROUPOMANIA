const UserModel = require("../models/user.model");
const PostModel = require("../models/post.model");
const ObjectID = require("mongoose").Types.ObjectId;
const fs = require("fs");
const jwt = require("jsonwebtoken");


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
    const postedBy = req.params.id;
    const connectedUser = req.user;
    if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
      res.cookie('jwt','', { session:false, maxAge: 1 })
      res.status(400).json("delete");
    }else{
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
      .then((docs) => res.json('profil mise a jour'))
      .catch((err) => res.status(500).send({ message: err }));
    // (err, docs)=>{
    //   if(!err) return res.status(201).send(docs);
    //   else return res.status(500).send({message : err})
    // }
  } catch (err) {
    return res.status(400).json({ message: err });
  }
}
};

exports.signalUser = (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).json("utilsateur inconnu :" + req.params.id);
  const postedBy = req.body.userFromId;
    const connectedUser = req.user;
    if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
      res.cookie('jwt','', { session:false, maxAge: 1 })
      res.status(400).json("delete");
    }else{
      const date = new Date(Date.now());
      const days = date.toLocaleDateString();
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const hours = String(date.getHours()).padStart(2, "0");
      const finalDate = `signalé le ${days} à ${hours}h${minutes}`;
      const signal = {
        signalById: req.body.userFromId ,
        signalByFullname: req.body.userFromFullname ,
        date: finalDate}
   UserModel.findById(req.params.id,{profilSignalBy:{$elemMatch : {signalByFullname : req.body.userFromFullname , SignalById :req.body.userFromId}}}, (err,doc)=>{
    console.log(doc.profilSignalBy);
     if (doc.profilSignalBy[0] !== undefined) {res.status(400).json('utilisateur déjà signalé')}
        else{
   UserModel.findByIdAndUpdate(req.params.id,{$push: { profilSignalBy:signal}},(err,doc)=>{
      if(err) res.status(400).json(err)
      else res.status(200).json('utilisateur signalé')
    })
    PostModel.updateMany({posterId: req.params.id},{$push:{signalProfil:req.body.userFromId}},(err,doc=>{
      if (!err) console.log('ajout postsignal ok ')
      else console.log('ajout postSignal erreur');
    }))
  }
    });
      
    }}

exports.banuser = (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).json("utilsateur inconnu :" + req.params.id);
  const connectedUser = req.user;
  if (connectedUser == !process.env.ADMINID ) {
    res.cookie('jwt','', { session:false, maxAge: 1 })
    res.status(400).json("delete");
  }else{
    UserModel.findById(req.params.id,{ban : true} , (err , doc)=> {
      if( doc.ban == true ) {res.status(400).json('utilisateur deja banni')
    } else {
      PostModel.updateMany({posterId:req.params.id }, {$set:{banuser:true}},(err,doc)=>{
        if (err) return res.status(400).json('post'+err)
        else console.log(doc)
      })
      UserModel.findByIdAndUpdate(req.params.id, { $set: { ban: true } }, (err, doc) => {
        if (err) return res.status(400).send('user'+err)
        res.status(200).send('Utilisateur banni')
      })
      }
    })
  }
}

exports.unbanuser = (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("utilsateur inconnu :" + req.params.id);
  const connectedUser = req.user;
  if (connectedUser == !process.env.ADMINID ) {
    res.cookie('jwt','', { session:false, maxAge: 1 })
    res.status(400).json("delete");
  }else{
    UserModel.findById(req.params.id,{ban : false} , (err , doc)=> {
      if( doc.ban == false ) {res.status(400).json('utilisateur non banni')
    } else {
      PostModel.updateMany({posterId:req.params.id} , {$set:{banuser:false}} ,(err,doc)=>{
        if (err) return res.status(400).json('post'+err)
        else console.log(doc)})
        UserModel.findByIdAndUpdate(req.params.id,{$set:{ban:false}},(err,doc)=>{
          if(!err) res.status(200).json('utilisateur débanni')
          else res.status(400).json('user'+err)
        })

        }
    })
  }
}




exports.delPicUser = (req,res) => {
  if (!ObjectID.isValid(req.params.id))
  return res.status(400).send("utilsateur inconnu :" + req.params.id);
  UserModel.findById(req.params.id)
  .then((post)=>{  
    const postedBy = post.posterId;
      const connectedUser = req.user;
      if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
        res.cookie("jwt", "", { session: false, maxAge: 1 });
        res.status(400).json("nocookie");
      } else {
        let delimg = post.picture.split("images/default")[1];
        fs.unlink(`images/default/${delimg}`, () => {
          UserModel.findByIdAndRemove(req.params.id, (err, docs) => {
            // console.log(req);
            if (!err) {
             
              res.status(200).json('lalalala photo supprimer');
            } else {
              res.status(400).send(err);
            }
          });
        });
      }
    }).catch((err) => {err;})

}

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
    const postedBy = req.params.id;
    const connectedUser = req.user;
    if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
      res.cookie('jwt','', { session:false, maxAge: 1 })
      res.status(400).json("delete");
    }else{
      UserModel.find({ _id: req.params.id, following:  req.body.idToFollow  },(err,doc)=>{
      if ( doc[0] != undefined) return res.status(400).json('utilisateur deja follow');
      else {
  try {
     UserModel.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { following: req.body.idToFollow } },
      { new: true, upsert: true },(err,doc)=>{
       if(!err) res.status(201).json('follow ok')
       else res.status(400).json( err )


      }
    )
      // .then((docs) => res.status(201).json(docs))
      // .catch((err) => res.status(400).json({ message: err }));
  
    UserModel.findByIdAndUpdate(
      req.body.idToFollow,
      { $addToSet: { followers: req.params.id } },
      { new: true, upsert: true }
    ).catch((err) => res.status(400).json({ message: err }));

    PostModel.findOneAndUpdate({posterId : req.body.idToFollow},
      {$push :{ posterfollower : req.params.id } },
      // { new: true, upsert: true }
      )
      .catch((err) => res.status(400).json({ message: err }));
     PostModel.findOneAndUpdate({posterId : req.params.id},
      {$push :{ posterfollowing : req.body.idToFollow}},
      // { new: true, upsert: true }
      )
      .catch((err) => res.status(400).json({ message: err }));
   } catch (err) {
    res.status(500).json({ message: err });}
  }}) 
  }
};

// unfollow user end point \\

exports.unfollow =  (req, res) => {
  if (
    !ObjectID.isValid(req.params.id) ||
    !ObjectID.isValid(req.body.idToUnFollow)
  )
    return res.status(400).send("utilsateur inconnu :" + req.params.id);
    const postedBy = req.params.id;
    const connectedUser = req.user;
    if (connectedUser == !process.env.ADMINID || connectedUser == !postedBy) {
      res.cookie('jwt','', { session:false, maxAge: 1 })
      res.status(400).json("delete");
    }else{
  try {
     UserModel.findByIdAndUpdate(req.params.id,
      { $pull: { following: req.body.idToUnFollow } },
      (err,doc)=>{
        if(err) res.status(400).json('probleme unfollow')
        else res.status(201).json('unfollow ok ')
       }
    )
    // .then((docs) =>  res.status(201).json(docs))
      // .catch((err) => res.status(400).json({ message: err }));

      
   UserModel.findByIdAndUpdate( req.body.idToUnFollow,
      { $pull: { followers: req.params.id } },
      // { new: true, upsert: true }
    ).catch((err) => res.status(400).json({ message: err }));
     PostModel.findOneAndUpdate({posterId : req.body.idToUnFollow},
      {$pull:{ posterfollower : req.params.id } },
      // { multi: true, upsert: true }
      ).catch((err) => res.status(400).json({ message: err }));
     PostModel.findOneAndUpdate({posterId : req.params.id},
      {$pull:{ posterfollowing : req.body.idToUnFollow}},
      // { multi: true, upsert: true }
      ).catch((err) => res.status(400).json({ message: err }));
  } catch (err) {
    res.status(500).json({ message: err });
  }
}
};
