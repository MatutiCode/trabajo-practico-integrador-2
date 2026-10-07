import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } = process.env;

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT || 3306,
  dialect: "mysql",
  logging: false,
});

export const connectDB = async () => {
  console.log("modelos creados");
  try {
    await sequelize.authenticate();
    console.log("Conexión a la base de datos establecida correctamente");
  } catch (error) {
    console.error("No se pudo conectar a la base de datos");
    console.error(error);
    process.exit(1);
  }
};
