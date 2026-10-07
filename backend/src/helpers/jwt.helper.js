import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "secreto_por_defecto";

export const generateToken = (payload) => {
  return jwt.sign(payload, SECRET, { expiresIn: "24h" });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET);
};
