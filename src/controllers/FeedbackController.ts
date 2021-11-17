import BaseController from "./BaseController";
import {IFullAttributes, IModelAttributes} from "../models/types/types";
import {WS_CREATE_EVENTS, WS_EVENTS} from "./types/const";
import {IControllerMethods} from "@/controllers/types/types";

export class FeedbackController extends BaseController<IModelAttributes.IFeedback> {

    createEvent(event: number): number {

        switch (event) {
            case WS_CREATE_EVENTS.CREATED:
                return WS_EVENTS.FEEDBACK_CREATED;
            case WS_CREATE_EVENTS.UPDATED:
                return WS_EVENTS.FEEDBACK_UPDATED;
            case WS_CREATE_EVENTS.DELETED:
                return WS_EVENTS.FEEDBACK_DELETED;
            default: return WS_EVENTS.NONE

        }
    }

    async create(item: IModelAttributes.IFeedback): Promise<IFullAttributes.IClientFeedback> {
        try {
            return super.create(item);
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async findAll(options: IControllerMethods.IFindAllOptions): Promise<IFullAttributes.IClientFeedback[]> {

        options.include = [{model: 'creator'}]
        try {
            return super.findAll(options);
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

}
