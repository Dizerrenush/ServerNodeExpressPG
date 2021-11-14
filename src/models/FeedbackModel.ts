
import {DataTypes} from "sequelize";
import type {Sequelize} from "sequelize";
import {IModel} from "@/models/types/types";

export default (db: Sequelize)  => {
    return db.define<IModel.IFeedback>('feedback', {
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