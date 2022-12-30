const express = require("express")
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");
 
const postController = require('../controllers/post.controller');
const modify = require('../middleware/picture.modify.middleware')
const image = require("../middleware/picture.post.middleware");
const photo = require("../middleware/photo.user.post.middleware");
const { multerErrors } = require("../utils/errors.utils");

router.get('/',requireAuth, postController.readPost);
router.get('/:id',requireAuth,postController.getOnePost);
router.get('/postby/:id',requireAuth,postController.getPostByPosterid);
// router.get('/postown/:id',postController.getPostOwn);
router.get('/postlike/:id',requireAuth,postController.getPostLike);
router.get('/postfollowing/:id',requireAuth,postController.getPostFollowing);
router.get('/postfollower/:id',requireAuth,postController.getPostFollower);
router.patch('/postsignal/:id',requireAuth,postController.getPostSignal);
router.put('/:id',requireAuth,(req, res, next) => {modify(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });} else {next();}});}, postController.updatePost);
router.delete('/:id',requireAuth, postController.deletePost);
router.patch('/like-post/:id',requireAuth, postController.likePost);
router.patch('/unlike-post/:id',requireAuth, postController.unLikePost);

// router manage picture post + multer errors \\

router.delete('/picture/:id',requireAuth,postController.deleteOnePicture)
router.delete('/delete-old-pic-modify/:id',requireAuth,postController.deleteOldPicModidify)
router.post('/',requireAuth,(req, res, next) => {image(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });
} else {next();} }); } ,postController.createPost);

router.put('/photo/:id',requireAuth,(req, res, next) => {photo(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });
} else {next();}});},postController.updatePictureUserPost )

// gestion des commentaire\\

router.patch('/comment-post/:id',requireAuth, postController.commentPost);
router.patch('/edit-comment-post/:id',requireAuth, postController.editCommentPost);
router.patch('/delete-comment-post/:id',requireAuth, postController.deleteCommentPost );


module.exports = router;