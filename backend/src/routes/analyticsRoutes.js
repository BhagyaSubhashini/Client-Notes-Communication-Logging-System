import express from "express";

import {
  getAnalytics,
} from "../controllers/analyticsController.js";

import {
  protect,
} from "../middleware/authMiddleware.js";

import {
  authorizeRoles,
} from "../middleware/roleMiddleware.js";

const router = express.Router();

router.get(
  "/",
  protect,
  authorizeRoles("super_user"),
  getAnalytics
);

export default router;