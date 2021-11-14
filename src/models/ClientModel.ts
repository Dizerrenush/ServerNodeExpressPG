
import {DataTypes} from "sequelize";
import type {Sequelize} from "sequelize";
import {Model} from "sequelize-typescript";
import {IModelAttributes} from "@/models/types/types";

export default (db: Sequelize) => {
    return db.define<Model<IModelAttributes.IClient>>('client', {
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