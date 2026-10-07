import { Router } from "express";
import {
  createTag,
  getTags,
  getTagById,
  updateTag,
  deleteTag,
} from "../controllers/tag.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import { validateTag, validateTagId } from "../middlewares/tag.validator.js";

const router = Router();

router.post("/", authMiddleware, adminMiddleware, validateTag, createTag);
router.get("/", authMiddleware, getTags);
router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  validateTag,
  validateTagId,
  getTagById,
);
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateTag,
  validateTagId,
  updateTag,
);
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  validateTag,
  validateTagId,
  deleteTag,
);

export default router;
