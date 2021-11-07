import {DataTypes} from "sequelize";
import type {Sequelize} from "sequelize";

export default (db: Sequelize) => {
    return db.define('client', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        clientId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false
        }
    })
};