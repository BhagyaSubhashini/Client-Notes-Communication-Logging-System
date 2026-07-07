import express from "express";
import {
  createNote,
  getNotesByClient,
  searchNotes,
  getLatestNotes,
  getNoteById,
} from "../controllers/noteController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// CREATE NOTE
router.post(
  "/",
  protect,
  createNote
);

// DIRECT SEARCH
router.get(
  "/search/direct",
  protect,
  searchNotes
);

// LATEST NOTES
router.get(
  "/latest/all",
  protect,
  getLatestNotes
);

// SINGLE NOTE
router.get(
  "/single/:id",
  protect,
  getNoteById
);

// NOTES BY CLIENT
router.get(
  "/:client_id",
  protect,
  getNotesByClient
);

export default router;