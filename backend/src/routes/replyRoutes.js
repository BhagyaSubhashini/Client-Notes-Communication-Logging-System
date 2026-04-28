import express from "express";
import { addReply, getReplies } from "../controllers/replyController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addReply);
router.get("/:note_id", protect, getReplies);

export default router;