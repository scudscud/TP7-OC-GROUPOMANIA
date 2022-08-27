const express = require("express")
const router = express.Router();
const { checkUser, requireAuth , authUser } = require("../middleware/auth.middleware");

const postController = require('../controllers/post.controller');
const modify = require('../middleware/picture.modify.middleware')
const image = require("../middleware/picture.post.middleware");
const { multerErrors } = require("../utils/errors.utils");

router.get('/', postController.readPost);
router.get('/:id',postController.onePost);
router.put('/:id',(req, res, next) => {modify(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });
} else {
  
  next();}
    });
  }, postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unLikePost);



// router post + multer errors \\

router.post('/',(req, res, next) => {image(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });
} else {next();}
    });
  }
  ,postController.createPost);


// gestion des commentaire\\

router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost );


module.exports = router;