import { body, param } from "express-validator";
import { validateResult } from "./validate.middleware.js";

export const validateTag = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("el nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("el nombre debe tener entre 2 a 30 caracteres")
    .custom((value) => !/\s/.test(value))
    .withMessage("el nombe de la etiqueta no debe contener espacios"),
  validateResult,
];

export const validateTagId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("El id de la etiquta debe ser un número entero valido"),
  validateResult,
];
