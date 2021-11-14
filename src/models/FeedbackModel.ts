
import {DataTypes} from "sequelize";
import type {Sequelize} from "sequelize";
import {Model} from "sequelize-typescript";
import {IModelAttributes} from "@/models/types/types";

export default (db: Sequelize)  => {
    return db.define<Model<IModelAttributes.IFeedback>>('feedback', {
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
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
};