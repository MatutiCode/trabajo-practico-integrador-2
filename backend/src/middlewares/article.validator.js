import { body, param } from "express-validator";
import { validateResult } from "./validate.middleware.js";

export const validateArticle = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 100 })
    .withMessage("El título debe tener entre 3 y 100 caracteres"),
  body("content").trim().notEmpty().withMessage("El contenido es obligatorio"),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Las etiquetas deben enviarse en un arreglo de IDs"),
  validateResult,
];

export const validateArticleId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El ID del artículo debe ser un número entero válido"),
  validateResult,
];
