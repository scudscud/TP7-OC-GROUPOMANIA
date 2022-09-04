const multer = require('multer');


function fileFilter(req, file, cb) {
  // console.log(req);
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") { cb(null, true); }
  else {
    cb(null, false);
    return cb(new Error('invalid format'));
  }
}
  const storage = multer.diskStorage({
    // destination : (req,res,cb)=> {cb(null,`images/upload`)},
    filename: function (req, file, cb) { 
     
        //  console.log(req);
       // id du user pour le name \\
       const name = req.user + ".jpg"
      
        cb(null,name);
      },
  })
  const  maxSize = 50000000;
   const upload = multer({storage ,limits : { fileSize : maxSize},fileFilter : fileFilter,})

module.exports = upload.single('picture');
 