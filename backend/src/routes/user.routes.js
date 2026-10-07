import { Router } from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  validateUserId,
  validateUpdateUser,
} from "../middlewares/user.validator.js";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsers);
router.get("/:id", authMiddleware, validateUserId, getUserById);
router.put("/:id", authMiddleware, validateUpdateUser, updateUser);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateUserId,
  deleteUser,
);

export default router;
