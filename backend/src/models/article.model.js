import { DataTypes, TableHints } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./user.model.js";

export const Article = sequelize.define(
    "Article",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        excerpt: {
            type: DataTypes.STRING(500),
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM("published", "archived"),
            allowNull: false,
            defaultValue: "published",
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "articles",
        underscored: true,
        paranoid: true,
        timestamps: true,
    }
);

User.hasMany(Article, { foreignKey: "user_id", as: "articles"});
Article.belongsTo(User, { foreignKey: "user_id", as: "author"});