const express = require("express")
const router = express.Router();
const { requireAuth } = require("../middleware/auth.middleware");

const postController = require('../controllers/post.controller');
const modify = require('../middleware/picture.modify.middleware')
const image = require("../middleware/picture.post.middleware");
const photo = require("../middleware/photo.user.post.middleware");
const { multerErrors } = require("../utils/errors.utils");

router.get('/', postController.readPost);
router.get('/:id',postController.getOnePost);
router.get('/postby/:id',postController.getPostByPosterid);
// router.get('/postown/:id',postController.getPostOwn);
router.get('/postlike/:id',postController.getPostLike);
router.get('/postfollowing/:id',postController.getPostFollowing);
router.get('/postfollower/:id',postController.getPostFollower);
router.get('/postsignal/:id',postController.getPostSignal);
router.put('/:id',requireAuth,(req, res, next) => {modify(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });} else {next();}});}, postController.updatePost);
router.delete('/:id',requireAuth, postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unLikePost);

// router manage picture post + multer errors \\

router.delete('/picture/:id',requireAuth,postController.deleteOnePicture)
router.delete('/delete-old-pic-modify/:id',requireAuth,postController.deleteOldPicModidify)
router.post('/',requireAuth,(req, res, next) => {image(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });
} else {next();} }); } ,postController.createPost);

router.put('/photo/:id',requireAuth,(req, res, next) => {photo(req, res, function (err) {if (err) {console.log(err.message);const errors = multerErrors(err);res.status(400).json({ errors });
} else {next();}});},postController.updatePictureUserPost )

// gestion des commentaire\\

router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost );


module.exports = router;