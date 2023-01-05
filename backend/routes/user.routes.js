const express = require("express");
// const jwt = require('jwt')
const image = require("../middleware/photo.user.middleware");

const { multerErrors } = require("../utils/errors.utils");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const userController = require("../controllers/user.controller");
const uploadController = require("../controllers/upload.controller");
const { requireAuth } = require("../middleware/auth.middleware");


// router.get('/me', authenticateToken, (req,res,next) => res.send(req.user))
router.post("/register", authController.signUp);
router.post("/login", authController.signIn);
router.get("/logout", authController.logout);

//user  \\

router.get("/", userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put("/:id",requireAuth,(req, res, next) => {image(req, res, function (err) {if (err) {console.log(err.message); const errors = multerErrors(err);res.status(400).json({ errors });
} else {next();}
  });
}, userController.updateUser);
router.patch("/banuser/:id",requireAuth,userController.banuser)
router.patch("/unbanuser/:id",requireAuth,userController.unbanuser)
router.patch("/signalUser/:id",requireAuth,userController.signalUser)
router.patch("/deleteuserpicture/:id",requireAuth,userController.delPicUser)
router.delete("/:id", userController.userDelete);
router.patch("/follow/:id",requireAuth, userController.follow);
router.patch("/unfollow/:id",requireAuth, userController.unfollow);

// router upload picture profil + multer error\\

// router.delete('/photo/:id',userController.deletePictureProfil)

router.post(
  "/:id",requireAuth, 
  (req, res, next) => {image(req, res, function (err) {if (err) {console.log(err.message); const errors = multerErrors(err);res.status(400).json({ errors });
  } else {next();}
    });
  }
  ,uploadController.uploadProfil);

  module.exports = router;