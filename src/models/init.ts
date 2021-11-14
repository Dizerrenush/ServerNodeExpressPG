
import db from '../database/connect';

import Client_model from './ClientModel'
import Feedback_model from './FeedbackModel';

import {ClientController} from "../controllers/ClientController";
import {FeedbackController} from "../controllers/FeedbackController";
import ExpressWrapperController from "../controllers/ExpressWrapperController";

import ClientValidator from "../validation/client";
import FeedbackValidator from "../validation/feedback";

import clientRoute from '../routes/clientRoute';
import feedbackRoute from '../routes/feedbackRoute';
import {IModelAttributes} from "@/models/types/types";

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

    const clientController = new ClientController(clientModel);
    const expressClientController = new ExpressWrapperController<IModelAttributes.IClient>(clientController);
    const client = clientRoute(expressClientController,ClientValidator);

    const feedbackController = new FeedbackController(feedbackModel);
    const expressFeedbackController = new ExpressWrapperController<IModelAttributes.IFeedback>(feedbackController);
    const feedback = feedbackRoute(expressFeedbackController,FeedbackValidator);
    return [client,feedback]


}



