const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../controllers/auth.controller");
const { authAdmin, authUser } = require("../middlewares/auth.middleware");
const userModel = require("../models/user.model");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/getMe", authUser, async function getMe(req, res) {
  try {
    // req.user should be set by auth middleware
    const userId = req.user.id;

    // Fetch user (exclude password)
    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "Profile fetched successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

module.exports = router;
