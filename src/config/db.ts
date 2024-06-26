import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

// Se ejecuta para integra a process las variables de entorno
dotenv.config();
const urlDB = process.env.DATABASE_URL;
const db = new Sequelize(urlDB, { 
    models: [__dirname + '/../models/**/*'], 
    logging: false
})

export default db;