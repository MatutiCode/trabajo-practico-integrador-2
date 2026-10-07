import { body } from "express-validator";
import { validateResult } from "./validate.middleware.js";

export const validateRegister = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("el nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("el nombre de usuario debe tener entre 3 y 20 caracteres")
    .isAlphanumeric()
    .withMessage("el nombre de usuario solo puede contener letras y numeros"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("el email es obligatorio")
    .isEmail()
    .withMessage("debe ingresar un email valido"),
  body("password")
    .notEmpty()
    .withMessage("la contraseña es obligatoria")
    .isLength({ min: 8 })
    .withMessage("la contraseña debe tener almenos 8 caracteres")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage(
      "la contraseña debe contener almenos una letra mayuscula, una minuscula y un numero",
    ),
  validateResult,
];

export const validateLogin = [
  body("email")
    .trim()
    .notEmpty()
    .withMessage("el email es obligatorio")
    .isEmail()
    .withMessage("debe ingresar un email valide"),
  body("password").notEmpty().withMessage("la contraseña es obligatoria"),
  validateResult,
];
