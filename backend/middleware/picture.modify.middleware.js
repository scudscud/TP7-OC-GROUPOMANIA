const multer = require('multer');


function fileFilter(req, file, cb) {
//  console.log(req);
//  console.log(namepic);
  if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") { cb(null, true); }
  else {
    cb(null, false);
    return cb(new Error('invalid format'));
  }
}
  const storage = multer.diskStorage({destination : (req,res,cb)=> {cb(null,`images`)},
    filename: function (req, file, cb) { 
      // if(req.body.oldname == ''){      
      //  namepic = req.body.posterId+ Date.now() + ".jpg"
      // } else {
      // namepic = req.body.oldname.split('images/')[1]}
      // id du post pour le name photo \\ 
        namepic = req.body.id +Date.now()+".jpg"
        cb(null,namepic);
      },
  })       

  const  maxSize = 5000000;

const upload = multer({
    storage: storage,
    limits : { fileSize : maxSize},
    fileFilter : fileFilter,})

module.exports = upload.single('file');
 
 