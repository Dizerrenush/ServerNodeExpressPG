import BaseController from "./BaseController";
import {IModelAttributes} from "../models/types/types";
import {WS_EVENTS, WS_CREATE_EVENTS} from "./types/const";

export class ClientController extends BaseController<IModelAttributes.IClient> {

    createEvent(event: number): number {

        switch (event) {
            case WS_CREATE_EVENTS.CREATED:
                return WS_EVENTS.CLIENT_CREATED;
            case WS_CREATE_EVENTS.UPDATED:
                return WS_EVENTS.CLIENT_UPDATED;
            case WS_CREATE_EVENTS.DELETED:
                return WS_EVENTS.CLIENT_DELETED;
            default: return WS_EVENTS.NONE

        }
    }

}
