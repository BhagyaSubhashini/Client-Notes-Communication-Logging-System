import express from "express";
import {
  uploadAttachment,
  getAttachments,
} from "../controllers/attachmentController.js";

import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Upload file
router.post("/", protect, upload.single("file"), uploadAttachment);

// Get files
router.get("/:note_id", protect, getAttachments);

export default router;