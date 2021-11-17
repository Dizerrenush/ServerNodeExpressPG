
    import BaseController from "./BaseController";
import {IModelAttributes} from "../models/types/types";
import {WS_CREATE_EVENTS, WS_EVENTS} from "./types/const";
    import { create } from "domain";

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

    async create(item: IModelAttributes.IFeedback): Promise<IModelAttributes.IFeedback> {
        try {
            const model = await this._model.create(item);
            return model.get({plain: true});
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

}
