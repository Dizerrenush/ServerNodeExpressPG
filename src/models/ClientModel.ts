
import {DataTypes} from "sequelize";
import type {Sequelize,Model} from "sequelize";
import type {IModelAttributes} from "../models/types/types";

export default (db: Sequelize) => {
    return db.define<Model<IModelAttributes.IClient>>('client', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
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