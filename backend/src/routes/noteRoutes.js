import express from "express";
import {
  createNote,
  getNotesByClient,
} from "../controllers/noteController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createNote);
router.get("/:client_id", protect, getNotesByClient);

export default router;