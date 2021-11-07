import db from '../database/connect';
import Client_model from './client.model'
import Feedback_model from './feedback.model';

export default async function init () {

    const Client = Client_model(db);
    const Feedback = Feedback_model(db);

    Client.hasMany(Feedback, {
        sourceKey: 'id',
        foreignKey: 'clientId',
        as: 'feedbacks',
    });

    Feedback.belongsTo(Client, {targetKey: 'id'});
    db.authenticate().then(() => {
        console.log('Database connected...');
    }).catch(err => {
        console.log('Error: ' + err);
    })

    return db.sync();
}



