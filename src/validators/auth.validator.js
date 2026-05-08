const { z } = require("zod");

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["user", "admin"]).optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address").optional(),
  username: z.string().min(3).optional(),
  password: z.string().min(6),
}).refine((data) => data.email || data.username, {
  message: "Either email or username is required",
  path: ["email"],
});

module.exports = { registerSchema, loginSchema };
