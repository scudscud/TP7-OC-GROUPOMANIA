const multer = require('multer');
const { uploadErrors } = require("../utils/errors.utils");


const fileFilter =  (req, file, cb) => {
  // console.log(file);
  
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg")
  {cb(null,true)}

  else{
    cb( null,false);
    return cb(new Error (`il n'y a que les formats .png, .jpg and .jpeg autorisé`));  
  }
}

  const storage = multer.diskStorage({

    destination : (req,res,cb)=> {
      console.log(req);
      cb(null,`../client/public/uploads/profil/`)
    },
    filename: function (req, file, cb) { 
       const name = req.body.name + ".jpg"

      // const name = req.body + ".jpg"
        // const name = file.originalname.split(" ").join("_");
        // const extension = name.split(".");
        //   const type = extension[0] + ".jpg";
        // console.log(extension);
        cb(null,name);
      },
  })

  const  maxSize = 5000000;

const upload = multer({
    storage ,
    limits : { fileSize : maxSize},
    fileFilter : fileFilter,
} 

)

 image = upload.single('file'),(req, res,next) => {

  upload(req, res, function (err) {

      // const name = req.body;
      
   
      // console.log(name);
      // req.file.filename = req.body.name;
    
    if (err) {
   const errors = multerError(err);
     res.status(400).send({errors} )
    } else {
      res.status(201).json("image charge")
    }
  }
  
  )};

  module.exports = image;
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