import express from "express";
import {
  getNotifications,
  markAsRead,
} from "../controllers/notificationController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all notifications
router.get("/", protect, getNotifications);

// Mark as read
router.put("/:id", protect, markAsRead);

export default router;