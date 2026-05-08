const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  editPost,
} = require("../controllers/post.controller");
const { authAdmin, authUser } = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/create", authAdmin, createPost);
router.delete("/delete/:postId", authAdmin, deletePost);
router.patch("/update/:postId", authAdmin, editPost);

router.get("/posts", authUser, getAllPosts);
router.get("/posts/:postId", authUser, getPostById);

module.exports = router;
