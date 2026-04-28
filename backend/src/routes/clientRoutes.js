import express from "express";
import {
  createClient,
  getClients,
  searchClients,
} from "../controllers/clientController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createClient);
router.get("/", protect, getClients);
router.get("/search", protect, searchClients);

export default router;