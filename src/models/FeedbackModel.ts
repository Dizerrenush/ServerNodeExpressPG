
import {DataTypes} from "sequelize";
import type {Sequelize,Model} from "sequelize";
import type {IModelAttributes} from "./types/types";

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