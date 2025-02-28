import express from "express";
import {
  getTrains,
  getTrain,
  createTrain,
  updateTrain,
  deleteTrain,
  searchTrains,
} from "../controllers/train.controller.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/search", searchTrains);
router.get("/", getTrains);
router.get("/:id", getTrain);

// Protected admin routes
router.use(protect);
router.use(authorize("admin"));

router.post("/", createTrain);
router.put("/:id", updateTrain);
router.delete("/:id", deleteTrain);

export default router;
