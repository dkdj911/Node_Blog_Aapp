const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware = require("../middleware/Auth");
const { body } = require("express-validator");
const commentController = require("../controller/CommentController");
router.post(
	"/comment/add",
	authMiddleware.isSignedIn,
	commentController.addComment
);
router.get("/comment/:postId", commentController.getAllComment);
router.patch("/comment/edit", () => {});
router.delete("/comment/delete/:commentId", () => {});
module.exports = router;
