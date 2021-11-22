import BaseController from "./BaseController";
import {IModelAttributes} from "../models/types/types";
import {WS_BASE_EVENT_ID,WS_EVENT_ID } from "./types/const";

export class ClientController extends BaseController<IModelAttributes.IClient> {

    getEventId(event: number): number {

        switch (event) {
            case WS_BASE_EVENT_ID.CREATED:
                return WS_EVENT_ID.CLIENT_CREATED;
            case WS_BASE_EVENT_ID.UPDATED:
                return WS_EVENT_ID.CLIENT_UPDATED;
            case WS_BASE_EVENT_ID.DELETED:
                return WS_EVENT_ID.CLIENT_DELETED;
            default: return WS_EVENT_ID.NONE

        }
    }

}
