import express from "express";
import {
  exportAllNotesPDF,
  exportAllNotesExcel,
  exportClientNotesPDF,
  exportClientNotesExcel,
} from "../controllers/exportController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//EXPORT ENTIRE SYSTEM

router.get(
  "/all/pdf",
  protect,
  exportAllNotesPDF
);

router.get(
  "/all/excel",
  protect,
  exportAllNotesExcel
);

//EXPORT SINGLE CLIENT

router.get(
  "/client/:clientId/pdf",
  protect,
  exportClientNotesPDF
);

router.get(
  "/client/:clientId/excel",
  protect,
  exportClientNotesExcel
);

export default router;