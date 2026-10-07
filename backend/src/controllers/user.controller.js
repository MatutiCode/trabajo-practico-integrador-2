import { User } from "../models/user.model.js";
import { Profile } from "../models/profile.model.js";
import { Article } from "../models/article.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
      include: [{ model: Profile, as: "profile" }],
    });
    return res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        { model: Profile, as: "profile" },
        { model: Article, as: "articles" },
      ],
    });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== Number(id)) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para modificar este perfil" });
    }

    const user = await User.findByPk(id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update(req.body);
    return res.status(200).json({ message: "Usuario actualizado con éxito" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    await user.update({ is_active: false });
    return res.status(200).json({ message: "Usuario desactivado con éxito" });
  } catch (error) {
    next(error);
  }
};
