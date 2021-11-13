
import db from '../database/connect';
import Client_model from './client.model'
import Feedback_model from './feedback.model';
import {ClientController} from "../controllers/ClientController";
import {ClientValidator} from "../validation/client";
import {FeedbackController} from "../controllers/FeedbackController";
import {FeedbackValidator} from "../validation/feedback";
import ExpressWrapperController from "../controllers/ExpressWrapperController";
import clientRoute from '../routes/clientRoute';
import feedbackRoute from '../routes/feedbackRoute'

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

    db.sync();

    let client = new ClientController(Client);
    client = new ExpressWrapperController(client);
    client = clientRoute(client,ClientValidator);

    let feedback = new FeedbackController(Feedback);
    feedback = new ExpressWrapperController(feedback);
    feedback = feedbackRoute(feedback,FeedbackValidator);

    return [client,feedback]


}



