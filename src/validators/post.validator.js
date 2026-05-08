const { z } = require("zod");

const createPostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  description: z.string().min(5, "Description must be at least 5 characters long"),
});

const updatePostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").optional(),
  description: z.string().min(5, "Description must be at least 5 characters long").optional(),
}).refine((data) => data.title || data.description, {
  message: "At least one field (title or description) must be provided for update",
});

module.exports = { createPostSchema, updatePostSchema };
