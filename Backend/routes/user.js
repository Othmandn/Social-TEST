const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const multer = require("../middleware/multer.config");
const { verifyPassword } = require("../middleware/auth");
//auth
router.post("/admin/signup", userCtrl.createAdmin);
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login, verifyPassword);
router.get("/logout", userCtrl.logout);

//user db
router.get("/", auth, userCtrl.getAllUsers);
router.get("/:id", auth, userCtrl.getOneUser);
router.put("/:id", auth, userCtrl.updateUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.patch("/follow/:id", auth, userCtrl.follow);
router.patch("/unfollow/:id", auth, userCtrl.unfollow);

//Upload
router.post("/upload/:id", auth, multer, userCtrl.uploadUserProfil);

module.exports = router;
