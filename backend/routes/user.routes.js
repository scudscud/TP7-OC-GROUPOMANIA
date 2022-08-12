const express = require("express");
// const jwt = require('jwt')
const image = require("../middleware/photo.user.middleware");
const { multerErrors } = require("../utils/errors.utils");

const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
// 

//auth\\



// router.get('/me', authenticateToken, (req,res,next) => res.send(req.user))
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user  \\

router.get("/", userController.getAllUsers);
router.get("/:id", userController.userInfo);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.userDelete);
router.patch("/follow/:id", userController.follow);
router.patch("/unfollow/:id", userController.unfollow);

// router upload picture profil + multer error\\

router.post(
  "/upload",
  (req, res, next) => {
    image(req, res, function (err) {
      if (err) {
        console.log(err.message);
        const errors = multerErrors(err);
        res.status(400).json({ errors });
      } else {
        next();
      }
    });
  }
  ,uploadController.uploadProfil);

  module.exports = router;