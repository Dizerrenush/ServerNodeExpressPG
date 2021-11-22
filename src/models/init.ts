
import db from "../database/connect";
import Client_model from "./ClientModel"
import Feedback_model from "./FeedbackModel";
import {ClientController} from "../controllers/ClientController";
import {FeedbackController} from "../controllers/FeedbackController";
import ExpressWrapperController from "../controllers/ExpressWrapperController";
import ClientValidator from "../validation/client";
import FeedbackValidator from "../validation/feedback";
import clientRoute from "../routes/clientRoute";
import feedbackRoute from "../routes/feedbackRoute";
import {IModelAttributes} from "./types/types";
import WebSocket from "ws";
import {WebSocketController} from "../controllers/WebSocketController";

export default async function init() {

    const clientModel = Client_model(db);
    const feedbackModel = Feedback_model(db);

    clientModel.hasMany(feedbackModel, {
        sourceKey: 'id',
        foreignKey: 'creatorId',
        as: 'feedbacks',
    });

    feedbackModel.belongsTo(clientModel, {as: 'creator', targetKey: 'id'});

    db.authenticate().then(() => {
        console.log('Database connected...');
    }).catch(err => {
        console.log('Error: ' + err);
    })

    await db.sync();

    const wsServer: string = process.env.WEBSOCKET_SERVER || 'ws://localhost:3000';
    const wsConnection = new WebSocket(wsServer);
    const webSocketController = new WebSocketController(wsConnection);

    const clientController = new ClientController(clientModel);
    const expressClientController = new ExpressWrapperController<IModelAttributes.IClient>(clientController, webSocketController);
    const client = clientRoute(expressClientController, ClientValidator);

    const feedbackController = new FeedbackController(feedbackModel, clientController);
    const expressFeedbackController = new ExpressWrapperController<IModelAttributes.IFeedback>(feedbackController, webSocketController);
    const feedback = feedbackRoute(expressFeedbackController, FeedbackValidator);
    return [client, feedback]


}



