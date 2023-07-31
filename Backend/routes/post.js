const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post");
const multer = require("../middleware/multer.config");
const { verifyIsAdmin, verifyIsUser } = require("../middleware/auth");

// router.use(verifyIsAdmin);
//En dessous tu met toutes les routes qui ne sont accessible que par l'admin

router.get("/", auth, postCtrl.readPost);
router.post("/", auth, multer, postCtrl.createPost);
router.put("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, postCtrl.deletePost);
router.patch("/like-post/:id", auth, postCtrl.likePost);
router.patch("/unlike-post/:id", auth, postCtrl.unlikePost);

// router.use(verifyIsUser);
//En dessous tu met toutes les routes qui ne sont accessible que par un user classique

//Comments
router.patch("/comment-post/:id", auth, postCtrl.commentPost);
router.patch("/edit-comment-post/:id", auth, postCtrl.editCommentPost);
router.patch("/delete-comment-post/:id", auth, postCtrl.deleteCommentPost);

module.exports = router;
