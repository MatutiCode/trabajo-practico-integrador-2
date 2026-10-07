import { body, param } from "express-validator";
import { validateResult } from "./validate.middleware.js";

export const validateUserId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("el id de usuario debe ser un numero entero valido"),
  validateResult,
];

export const validateUpdateUser = [
  validateUserId,
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage(" el nombre de usuario debe tener entre 3 a 20 caracteres")
    .isAlphanumeric()
    .withMessage("el nombre de usuario solo puede contener letras y numeros"),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("debe ingresar un email valido"),
  validateResult,
];
