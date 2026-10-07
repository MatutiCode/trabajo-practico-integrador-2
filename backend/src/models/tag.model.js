import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import { Article } from "./article.model.js";
import { ArticleTag } from "./articletag.model.js";

export const Tag = sequelize.define(
    "Tag",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: false,
            unique: true,
        },
    },
    {
        tableName: "tags",
        underscored: true,
        timestamps: true,
    }
);

Article.belongsToMany(Tag, {
    through: ArticleTag,
    foreignKey: "article_id",
    otherKey: "tag_id",
    as: "tags",
});
Tag.belongsToMany(Article, {
    through: ArticleTag,
    foreignKey: "tag_id",
    otherKey: "article_id",
    as: "articles",
});

Article.hasMany(ArticleTag, { foreignKey: "article_id", as: "articleTags" });
ArticleTag.belongsTo(Article, { foreignKey: "article_id", as: "article" });

Tag.hasMany(ArticleTag, { foreignKey: "tag_id", as: "articleTags" });
ArticleTag.belongsTo(Tag, { foreignKey: "tag_id", as: "tag" });

Article.addHook("beforeDestroy", async (article, options) => {
    await ArticleTag.destroy({
    where: { article_id: article.id },
    transaction: options.transaction,
    });
});