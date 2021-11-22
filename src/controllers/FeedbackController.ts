
import BaseController from "./BaseController";
import {IModelAttributes} from "../models/types/types";
import {WS_BASE_EVENT_ID, WS_EVENT_ID} from "./types/const";
import type {CreateOptions, FindOptions, Model, ModelCtor} from "sequelize";
import type {ClientController} from "@/controllers/ClientController";

export class FeedbackController extends BaseController<IModelAttributes.IFeedback> {

    private readonly _clientController: ClientController;

    constructor(model: ModelCtor<Model<IModelAttributes.IFeedback>>, clientController: ClientController) {
        super(model);

        this._clientController = clientController;
    }

    getEventId (event: number): number {
        switch (event) {
            case WS_BASE_EVENT_ID.CREATED:
                return WS_EVENT_ID.FEEDBACK_CREATED;
            case WS_BASE_EVENT_ID.UPDATED:
                return WS_EVENT_ID.FEEDBACK_UPDATED;
            case WS_BASE_EVENT_ID.DELETED:
                return WS_EVENT_ID.FEEDBACK_DELETED;
            default:
                return WS_EVENT_ID.NONE;
        }
    }

    async create(item: IModelAttributes.IFeedback, options?: CreateOptions<IModelAttributes.IFeedback>): Promise<IModelAttributes.IFeedback> {
        const clientController = this._clientController;
        let client: IModelAttributes.IClient | void;
        const {
            description,
            fullname,
                email,
        } = item;

        client = await clientController.findOne({where: {email}})

        if (!client && email) {
            client = await clientController.create({fullname,email})
        }
        if(client && fullname && !client.fullname){
            const client_updated = await clientController.update({fullname},{where:{id:client.id}});
            client = client_updated || client;
        }

        const data = {
            description: description,
            creatorId: client ? client.id : undefined,
        };
        const feedback = await super.create(data, {...options, include: ['creator']});;

        return {...feedback,...client};

    }

    async findAll(options: FindOptions<IModelAttributes.IFeedback>): Promise<IModelAttributes.IFeedback[] | void> {

        let feedbacks = await super.findAll({...options, include: 'creator'});

        if(feedbacks){
            feedbacks = feedbacks.map(el => {

                const {
                    description,
                    creatorId,
                    creator:{
                        fullname,
                        email,
                    }
                } = el;
                return {description,creatorId,fullname,email}
            })
        }

        return feedbacks;
    }

}
