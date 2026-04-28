import express from "express";
import { loginUser, createUser, registerUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post("/login", loginUser);
router.post("/register", registerUser);

// Only super user can create users
router.post("/create", protect, authorizeRoles("super_user"), createUser);

export default router;