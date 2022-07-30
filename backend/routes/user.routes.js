
const express = require("express");
const upload = require('../middleware/multer.user');
const {MulterError} = require("../utils/errors.utils");

const router = express.Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.controller');
const uploadController = require('../controllers/upload.controller');
// const multer = require('../middleware/multer.user')



//auth\\
router.post("/register", authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout',authController.logout)
//user  \\
router.get('/', userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.userDelete);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

// upload\\
router.post('/upload' ,
(req, res,next) => {
    upload(req, res, function (err) {
      if (err) {
     
       res.status(400).send("l'image est trop grande" )
      } else {
        res.status(201).json("image charge")
      }
   
    }
   
    
    )},

       uploadController.uploadProfil);



module.exports = router;
