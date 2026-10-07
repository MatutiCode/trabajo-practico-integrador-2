import { Router } from "express";
import {
  createArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
} from "../controllers/article.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  validateArticle,
  validateArticleId,
} from "../middlewares/article.validator.js";

const router = Router();

router.post("/", authMiddleware, validateArticle, createArticle);
router.get("/", getArticles);
router.get("/:id", validateArticleId, getArticleById);
router.put(
  "/:id",
  authMiddleware,
  validateArticleId,
  validateArticle,
  updateArticle,
);
router.delete("/:id", authMiddleware, validateArticleId, deleteArticle);

export default router;
