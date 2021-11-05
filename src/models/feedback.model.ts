import {Model, DataTypes} from "sequelize"
import {Client} from './client.model'
import {FeedbackInterface} from "./types/interfaces"
import db from '../database/connect'

export class Feedback extends Model<FeedbackInterface>
    implements FeedbackInterface {
    id!: number;
    description!: string;
    clientId!: number;
}

Feedback.init({
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
}, {
    sequelize: db,
    tableName: "feedbacks",
});
Feedback.belongsTo(Client, {targetKey: "id"});