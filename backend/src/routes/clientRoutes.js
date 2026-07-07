import express from "express";
import {
  createClient,
  getClients,
  searchClients,
  getClientStats,
  updateClient,
  deleteClient
} from "../controllers/clientController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createClient);
router.get("/", protect, getClients);
router.get("/search", protect, searchClients);
router.delete("/:id", protect, deleteClient);
router.get("/stats/dashboard",protect,getClientStats);
router.put("/:id", protect, updateClient);
export default router;