const multer = require('multer');


function fileFilter(req, file, cb) {
  // console.log(file);
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") { cb(null, true); }

  else {
    cb(null, false);
    return cb(new Error('invalid format'));
  }
}

  const storage = multer.diskStorage({

    destination : (req,res,cb)=> {
      // console.log(req);
      cb(null,`../client/public/uploads/profil/`)
    },
    filename: function (req, file, cb) { 
       const name = req.body.name + ".jpg"

        cb(null,name);
      },
  })

  const  maxSize = 50000;

const upload = multer({
    storage ,
    limits : { fileSize : maxSize},
    fileFilter : fileFilter,})

module.exports = upload.single('file');
 
 
 
 
 
//  (req, res,next) => {
//   upload(req, res, function (err) {
//     if (err) {

//   const errors = multerError(err);
//      res.status(400).send({errors} )

// }else {
//       res.status(201).json("image charge")
//     }
//   }
  
//   )

// };













//  console.log(req.file);

//   const name = req.file.originalname.split(".")
//   const type = name[1];
//   console.log(type);
//     try {

//     if (
//      type !== "jpg" && type !== "png" && type !== "jpeg"
//      )
//       throw Error("invalid file");
//     if (req.file.size > 5000000 ) throw Error("image trop grande");
//   } catch (err) {
//     const errors = uploadErrors(err)
//     return res.status(201).json( {errors} )
//   }