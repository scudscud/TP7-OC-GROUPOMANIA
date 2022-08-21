const multer = require('multer');


function fileFilter(req, file, cb) {

  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") { cb(null, true); }
  else {
    cb(null, false);
    return cb(new Error('invalid format'));
  }
}

  const storage = multer.diskStorage({destination : (req,res,cb)=> {cb(null,`images`)},
    filename: function (req, file, cb) { 
      // id du post pour le name photo \\
       const name = req.body.posterId+ Date.now() + ".jpg"
        cb(null,name);
      },
  })

  const  maxSize = 500000;

const upload = multer({
    storage: storage,
    limits : { fileSize : maxSize},
    fileFilter : fileFilter,})

module.exports = upload.single('file');
 
 