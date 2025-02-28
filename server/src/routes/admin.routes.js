import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import User from "../models/user.model.js";
import Booking from "../models/booking.model.js";
import Train from "../models/train.model.js";

const router = express.Router();

// Protect all routes and restrict to admin
router.use(protect);
router.use(authorize("admin"));

// @desc    Get all users
// @route   GET /api/admin/users
router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
router.get("/stats", async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalBookings = await Booking.countDocuments();
    const totalTrains = await Train.countDocuments();
    const recentBookings = await Booking.find()
      .sort("-createdAt")
      .limit(5)
      .populate("user", "name email")
      .populate("train", "trainName trainNumber");

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalBookings,
        totalTrains,
        recentBookings,
      },
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get booking statistics
// @route   GET /api/admin/booking-stats
router.get("/booking-stats", async (req, res, next) => {
  try {
    const bookingStats = await Booking.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          totalRevenue: { $sum: "$totalFare" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: bookingStats,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
