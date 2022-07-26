const UserModel = require("../models/user.model");
const fs = require("fs");
const {promisify}  = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require("../utils/errors.utils");


exports.uploadProfil = async (req, res) => {
  const name = req.file.originalname.split(".")
  const type = name[1];
    try {

    if (
     type !== "jpg" && type !== "png" && type !== "jpeg"
     )
      throw Error("invalid file");
    if (req.file.size > 5000000) throw Error("image trop grande");
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json( {errors} );
  }
  const fileName = req.body.name + ".jpg";

await pipeline (
     console.log(req.file),
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../static/${fileName}`,(err) => {
        if (err) {
          console.log("Pipeline failed", err.message);
        } else {
          console.log("Pipleline complete");
        }
      }
  )
  )
    
//  try{
//     UserModel.findByIdAndUpdate(
//         req.bodyuserId,
//         {
//             $set : {picture:"../static" }
//         },
//         {new:true, upsert : true , setDefaultsOnInsert : true},
//         (err,docs) => {
//             if (!err) return res.send(docs);
//             else return res.status(500).send({ message: err})
//         }
//     );
//  }catch (err) {
//      return res.status(500).send({ message: err})
//  }
};
