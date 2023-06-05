const express = require("express");
const router = express.Router();
const userController = require("../controller/UserController");
const authMiddleware = require("../middleware/Auth");
const { body } = require("express-validator");

const postController = require("../controller/PostController");

router.post(
  "/post/add",
  [
    body("title", "title minimum 2 charcatre").isLength({ min: 2 }),
    body("description", "description is minmum 5 character").isLength({
      min: 5,
    }),
  ],
  authMiddleware.isSignedIn,
  postController.addPost
);
router.get("/post", postController.getAllPost);
router.patch(
  "/post/edit/:postId",
  authMiddleware.isSignedIn,
  postController.editPOst
);
router.get("/post/:postId", postController.getSinglePost);
router.delete(
  "/post/delete/:postId",
  authMiddleware.isSignedIn,
  postController.deletePost
);
module.exports = router;
