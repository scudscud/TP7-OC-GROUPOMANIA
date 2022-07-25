const UserModel = require("../models/user.model");
const fs = require("fs");
// const promisify = require('util.promisify');
const {promisify }  = require('util');
const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require("../utils/errors.utils");

exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMime.type != "image/jpg" &&
      req.file.detectedMime.type != "image/png" &&
      req.file.detectedMime.type != "image/jpeg"
    )
      throw Error("invalid file");
    if (req.file.size > 5000000) throw Error("image trop grande");
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json( {errors} );
  }
  const fileName = req.body.name ;

await pipeline (
  // console.log(req.file.stream),
    req.file.stream,
    fs.createWriteStream(`${_dirname}/../static/${fileName}`,(err) => {
        if (err) {
          console.log("Pipeline failed", err);
        } else {
          console.log("Pipleline complete");
        }
      }
  ))
    
 try{
    UserModel.findByIdAndUpdate(
        req.bodyuserId,
        {
            $set : {photo:"../static" }
        },
        {new:true, upsert : true , setDefaultsOnInsert : true},
        (err,docs) => {
            if (!err) return res.send(docs);
            else return res.status(500).send({ message: err})
        }
    );
 }catch (err) {
     return res.status(500).send({ message: err})
 }
};
