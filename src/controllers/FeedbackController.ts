
    import BaseController from "./BaseController";
import {IModelAttributes} from "../models/types/types";
import {WS_CREATE_EVENTS, WS_EVENTS} from "./types/const";

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
}
