import express from "express";
import {
  createBooking,
  getBookings,
  getBooking,
  cancelBooking,
} from "../controllers/booking.controller.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(protect);

router.route("/").get(getBookings).post(createBooking);

router.route("/:id").get(getBooking);

router.route("/:id/cancel").put(cancelBooking);

export default router;
