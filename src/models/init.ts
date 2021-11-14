
import db from '../database/connect';
import Client_model from './ClientModel'
import Feedback_model from './FeedbackModel';
import {ClientController} from "../controllers/ClientController";
import {ClientValidator} from "../validation/client";
import {FeedbackController} from "../controllers/FeedbackController";
import {FeedbackValidator} from "../validation/feedback";
import ExpressWrapperController from "../controllers/ExpressWrapperController";
import clientRoute from '../routes/clientRoute';
import feedbackRoute from '../routes/feedbackRoute'

export default async function init () {

    const clientModel = Client_model(db);
    const feedbackModel = Feedback_model(db);

    clientModel.hasMany(feedbackModel, {
        sourceKey: 'id',
        foreignKey: 'clientId',
        as: 'feedbacks',
    });

    feedbackModel.belongsTo(clientModel, {targetKey: 'id'});

    db.authenticate().then(() => {
        console.log('Database connected...');
    }).catch(err => {
        console.log('Error: ' + err);
    })

    db.sync();

    let client = new ClientController(clientModel);
    client = new ExpressWrapperController(client);
    client = clientRoute(client,ClientValidator);

    let feedback = new FeedbackController(feedbackModel);
    feedback = new ExpressWrapperController(feedback);
    feedback = feedbackRoute(feedback,FeedbackValidator);

    return [client,feedback]


}



