
import {config} from 'dotenv';
import { Sequelize } from 'sequelize';

config();

export default new Sequelize(String(process.env.DB_NAME), String(process.env.DB_USERNAME), String(process.env.DB_PASSWORD), {
  host: process.env.DB_HOST,
  dialect: 'postgres',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
