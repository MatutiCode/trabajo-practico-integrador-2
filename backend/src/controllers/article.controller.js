import { Article } from "../models/article.model.js";
import { User } from "../models/user.model.js";
import { Tag } from "../models/tag.model.js";

export const createArticle = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const article = await Article.create({
      title,
      content,
      user_id: req.user.id,
    });

    if (tags && tags.length > 0) {
      await article.setTags(tags);
    }

    return res
      .status(201)
      .json({ message: "Artículo creado con éxito", article });
  } catch (error) {
    next(error);
  }
};

export const getArticles = async (req, res, next) => {
  try {
    const articles = await Article.findAll({
      include: [
        { model: User, as: "author", attributes: ["id", "username", "email"] },
        { model: Tag, as: "tags", through: { attributes: [] } },
      ],
    });
    return res.status(200).json(articles);
  } catch (error) {
    next(error);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [
        { model: User, as: "author", attributes: ["id", "username", "email"] },
        { model: Tag, as: "tags", through: { attributes: [] } },
      ],
    });

    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });
    return res.status(200).json(article);
  } catch (error) {
    next(error);
  }
};

export const updateArticle = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;

    const article = await Article.findByPk(id);
    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    if (req.user.role !== "admin" && article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para modificar este artículo" });
    }

    await article.update({ title, content });

    if (tags) {
      await article.setTags(tags);
    }

    return res
      .status(200)
      .json({ message: "Artículo actualizado con éxito", article });
  } catch (error) {
    next(error);
  }
};

export const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article)
      return res.status(404).json({ message: "Artículo no encontrado" });

    if (req.user.role !== "admin" && article.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "No tienes permiso para eliminar este artículo" });
    }

    await article.destroy();
    return res.status(200).json({ message: "Artículo eliminado con éxito" });
  } catch (error) {
    next(error);
  }
};
