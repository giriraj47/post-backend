const { uploadFile } = require("../services/storage.service");
const postModel = require("../models/post.model");

async function createPost(req, res) {
  const { title, description } = req.body;

  const post = await postModel.create({
    title,
    description,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    music: {
      id: post._id,
      title: post.title,
      user: post.user,
    },
  });
}

async function deletePost(req, res) {
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Check ownership
  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Unauthorized to delete this post",
    });
  }

  await post.deleteOne();

  res.status(200).json({
    message: "Post deleted successfully",
  });
}

async function editPost(req, res) {
  const postId = req.params.postId;

  const { title, description } = req.body;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  // Check ownership
  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({
      message: "Unauthorized to edit this post",
    });
  }

  if (title !== undefined) {
    post.title = title;
  }

  if (description !== undefined) {
    post.description = description;
  }

  await post.save();

  res.status(200).json({
    message: "Post updated successfully",
    post,
  });
}

async function getAllPosts(req, res) {
  const posts = await postModel.find().populate("user", "username");

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostById(req, res) {
  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  editPost,
};
