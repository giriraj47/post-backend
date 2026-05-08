const express = require("express");
const {
  createPost,
  getAllPosts,
  getPostById,
  deletePost,
  editPost,
} = require("../controllers/post.controller");
const { authAdmin, authUser } = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");
const { createPostSchema, updatePostSchema } = require("../validators/post.validator");

const router = express.Router();

/**
 * @swagger
 * /api/v1/post/create:
 *   post:
 *     summary: Create a new post (Admin only)
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Post created successfully
 *       403:
 *         description: Forbidden (Not an admin)
 *       400:
 *         description: Validation failed
 */
router.post("/create", authAdmin, validate(createPostSchema), createPost);

/**
 * @swagger
 * /api/v1/post/delete/{postId}:
 *   delete:
 *     summary: Delete a post (Admin only)
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       404:
 *         description: Post not found
 */
router.delete("/delete/:postId", authAdmin, deletePost);

/**
 * @swagger
 * /api/v1/post/update/{postId}:
 *   patch:
 *     summary: Update a post (Admin only)
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Post updated successfully
 */
router.patch("/update/:postId", authAdmin, validate(updatePostSchema), editPost);

/**
 * @swagger
 * /api/v1/post/posts:
 *   get:
 *     summary: Get all posts
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Posts fetched successfully
 */
router.get("/posts", authUser, getAllPosts);

/**
 * @swagger
 * /api/v1/post/posts/{postId}:
 *   get:
 *     summary: Get post by ID
 *     tags: [Posts]
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post fetched successfully
 */
router.get("/posts/:postId", authUser, getPostById);

module.exports = router;
