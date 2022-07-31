const UserModel = require("../models/user.model");
// const multer = require('multer');
// const upload = multer({ storage: storage,
//   limits: { fileSize: maxSize } 

// });
// const fs = require("fs");
// const {promisify}  = require('util');
// const pipeline = promisify(require('stream').pipeline);
const { uploadErrors } = require("../utils/errors.utils");


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

//   const fileName = req.body.name + ".jpg";
//  console.log(fileName);
//  pipeline (
//      console.log(req.file),
//     req.file.stream,
//     fs.createWriteStream(`../client/public/uploads/profil/${fileName}`));

  // const name = req.file.originalname.split(".")
  // const type = name[1];
  // console.log(type);
  //   try {

  //   if (
  //    type !== "jpg" && type !== "png" && type !== "jpeg"
  //    )
  //     throw Error("invalid file");
  //   if (req.file.size > 5000000 ) throw Error("image trop grande");
  // } catch (err) {
  //   const errors = uploadErrors(err)
  //   return res.status(201).json( {errors} )
  // }
  // console.log(req.body)
  // console.log(req.file)

  //   try {
  //   if (
  //     req.file.mimetype != 'image/jpeg' && 
  //     req.file.mimetype != 'image/jpg' && 
  //     req.file.mimetype != 'image/png' 
  //     )
  //     throw Error("invalid file");
  //   if (req.file.size > 5000000 ) throw Error("image trop grande");
  // } catch (err) {
  //   const errors = uploadErrors(err)
  //   return res.status(201).json( {errors} )
  //  }



//  const storage = multer.diskStorage ({
//     destination : (req,res,cb)=> {
//               cb(null,`../client/public/uploads/profil/`);
//             },
            
//     filename : (req,file,cb) => {

//         const fileName = filename + ".jpg";
//         cb(null,fileName)


//     }});

    