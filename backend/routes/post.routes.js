const express = require("express")
const router = express.Router();
const postController = require('../controllers/post.controller');
const image = require("../middleware/picture.post");
const { multerErrors } = require("../utils/errors.utils");

router.get('/', postController.readPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unLikePost);
router.post('/',  (req, res, next) => {
    image(req, res, function (err) {
      if (err) {
        console.log(err.message);
        const errors = multerErrors(err);
        res.status(400).json({ errors });
      } else {
        next();
      }
    });
  },postController.createPost);
// gestion des commentaire\\

router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost );


module.exports = router;