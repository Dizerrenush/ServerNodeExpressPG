import {DataTypes} from "sequelize";
import type {Sequelize} from "sequelize";
import type {IModel} from "@/models/types/types";

export default (db: Sequelize) => {
    return db.define<IModel.IClient>('client', {
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