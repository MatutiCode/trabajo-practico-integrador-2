import { verifyToken } from "../helpers/jwt.helper.js";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No autenticado, token faltante" });
    }

    const decoded = verifyToken(token);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Token inválido o malformado" });
    }

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "Usuario no encontrado o no válido" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Error en authMiddleware:", error.message);
    return res.status(401).json({ message: "token invalido o expirado" });
  }
};
