import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { Profile } from "../models/profile.model.js";
import { User } from "../models/user.model.js";

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email }});
        if (existingUser) {
            return res.status(400).json({ message: "el email ya esta registrado"});
        }

        const hasedPassword = await hashPassword(password);

        const user = await User.create({
            username,
            email,
            password: hasedPassword,
        });

        await Profile.create({ user_id: user.id });

        return res.status(201).json({
            message: "usuario registrado",
            user: { id: user.id, username: user.username, email: user.email},
        });
    } catch (error) {
        return res.status(500).json({ message: "error interno del servidor", error: error.message});
    }
};

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Credenciales inválidas" });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
        message: "Login exitoso",
        user: { id: user.id, username: user.username, role: user.role },
    });
    } catch (error) {
    return res.status(500).json({ message: "error interno del servidor", error: error.message });
    }
};

export const getProfile = async (req, res) => {
    try {
        return res.status(200).json({ user: req.user });
    }   catch (error) {
        return res.status(500).json({ message: "error al obtener el perfil", error: error.message});
    }

    export const logout = (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logout exitoso" });
};
};