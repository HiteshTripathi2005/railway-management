import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import User from "../models/user.model.js";

const router = express.Router();

// Protect all routes
router.use(protect);

// @desc    Get user profile
// @route   GET /api/users/profile
router.get("/profile", (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/profile
router.put("/profile", async (req, res, next) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
