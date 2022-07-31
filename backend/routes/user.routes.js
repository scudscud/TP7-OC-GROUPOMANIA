
const express = require("express");
const image = require('../middleware/multer.user');
const { multerError} = require("../utils/errors.utils");

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
router.post('/upload',image

    
    ,uploadController.uploadProfil)
    


module.exports = router;
