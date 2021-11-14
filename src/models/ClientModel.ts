import {DataTypes} from "sequelize";
import type {Sequelize} from "sequelize";

export default (db: Sequelize) => {
    return db.define('client', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    });
};