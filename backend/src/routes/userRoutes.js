import express from "express";
import { upload } from "../middleware/uploadMiddleware.js";

import {
  getUsers,
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
  updateUserByAdmin,
  changePassword,
  deleteUser,
  resetPassword,
} from "../controllers/userController.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorizeRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

// ALL LOGGED-IN USERS
router.post(
  "/upload-profile-image",
  protect,
  upload.single("image"),
  uploadProfileImage
);

router.get(
  "/profile/me",
  protect,
  getMyProfile
);

router.put(
  "/profile/me",
  protect,
  updateMyProfile
);

router.put(
  "/change-password",
  protect,
  changePassword
);


// SUPER USER ONLY

router.put(
  "/:id",
  protect,
  authorizeRoles("super_user"),
  updateUserByAdmin
);

router.get(
  "/",
  protect,
  authorizeRoles("super_user"),
  getUsers
);

router.delete(
  "/:id",
  protect,
  authorizeRoles("super_user"),
  deleteUser
);

router.put(
  "/reset-password/:id",
  protect,
  authorizeRoles("super_user"),
  resetPassword
);

export default router;