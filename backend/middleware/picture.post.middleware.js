const multer = require('multer');


function fileFilter(req, file, cb) {
  console.log(file.minetype);

  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") { cb(null, true); }

  else {
    cb(null, false);
    return cb(new Error('invalid format'));
  }
}

  const storage = multer.diskStorage({

    destination : (req,res,cb)=> {
      // console.log(req.body);
      // console.log(req.file);
      cb(null,`../client/public/uploads/posts/`)
    },
    filename: function (req, file, cb) { 
      // console.log(req);
      // console.log(file);
      // id du post pour le name photo \\
       const name = req.body.posterId+ Date.now() + ".jpg"
       

        cb(null,name);
      },
  })

  const  maxSize = 50000000;

const upload = multer({
    storage: storage,
    limits : { fileSize : maxSize},
    fileFilter : fileFilter,})

module.exports = upload.single('file');
 
 