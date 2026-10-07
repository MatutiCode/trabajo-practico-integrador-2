import { Article } from "../models/article.model.js";
import { Tag } from "../models/tag.model.js";

export const createTag = async (req, res, next) => {
  try {
    const { name } = req.body;
    const existingTag = await Tag.findOne({ where: { name } });
    if (existingTag)
      return resizeBy.status(400).json({ message: "la etiqueta ya existe" });
    const tag = await Tag.create({ name });
    return res.status(201).json({ message: "etiqueta creada con exito", tag });
  } catch (error) {
    next(error);
  }
};

export const getTags = async (req, res, next) => {
  try {
    return res.status(200) - json(await Tag.findAll());
  } catch (error) {
    next(error);
  }
};

export const getTagById = async (req, res, next) => {
  try {
    return res.status(200).json(await Tag.findAll());
  } catch (error) {
    next(error);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag)
      return res.status(404).json({ message: "etiqueta no encontrada" });

    const existingTag = await Tag.findOne({ where: { name: req.body.name } });
    if (existingTag && existingTag.id !== Number(req.params.id)) {
      return res
        .status(400)
        .json({ message: "ya existe otra etiqueta con ese nombre" });
    }

    await tag.update({ name: req.body.name });
    return res
      .status(200)
      .json({ message: "etiqueta actualizada con exito", tag });
  } catch (error) {
    next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByPk(req.params.id);
    if (!tag)
      return res.status(404).json({ message: "etiqueta no encontrada" });

    await tag.destroy();
    return res.status(200).json({ message: "etiqueta eliminada con exito" });
  } catch (error) {
    next(error);
  }
};
