import { Sequelize } from 'sequelize'
import { dbConfig } from "../database/config"

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
});
