const UserModel = require("../models/user.model");
const fs = require("fs");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);

exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMime.type != "image/jpg" &&
      req.file.detectedMime.type != "image/png" &&
      req.file.detectedMime.type != "image/jpeg"
    )
      throw Error("invalid file");
    if (req.file.size > 500000) throw Error("image trop grande");
  } catch (err) {
    const errors = uploadError(err);
    return res.status(201).json({ errors });
  }
  const fileName = req.body.name + ".jpg";

await pipeline(
    req.file.stream,
    fs.createWriteStream("`${_dirname}/../static/${fileName}`")
  );

 try{
    UserModel.findByIdAndUpdate(
        req.bodyuserId,
        {
            $set : {picture:"uploads/profil/" + fileName}
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
