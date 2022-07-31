const UserModel = require("../models/user.model");
const { uploadErrors } = require("../utils/errors.utils");


// picture profil user upload  end point => multer middleware : photo.user \\

exports.uploadProfil = async (req, res) => {

 try {
    UserModel.findByIdAndUpdate(
        req.body.userId,
        {
            $set : {photo: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`  }
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

