import dotenv from "dotenv";
import app from "./app.js";
import { connectDB, sequelize } from "./config/db.js";
import { Article } from "./models/article.model.js";
import { User } from "./models/user.model.js";
import { Profile } from "./models/profile.model.js";
import { Tag } from "./models/tag.model.js";
import { ArticleTag } from "./models/articletag.model.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectDB();
  await sequelize.sync();

  app.listen(PORT, () => {
    console.log(`Servidor corriento en http://localhost:${PORT}`);
  });
};

startServer();
