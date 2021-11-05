import {Model, DataTypes} from "sequelize"
import {Feedback} from './feedback.model'
import {ClientInterface} from './types/interfaces'
import db from '../database/connect'


export class Client extends Model<ClientInterface>
    implements ClientInterface {
    id!: number;
    fullname!: string;
    email!: string;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;
}

Client.init({
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
}, {
    sequelize:db,
    tableName: "clients",
});
Client.hasMany(Feedback, {
    sourceKey: "id",
    foreignKey: "clientId",
    as: "feedbacks", // this determines the name in `associations`!
});