
import type {IModelAttributes} from "../../models/types/types";
import {WS_BASE_EVENT_ID, WS_EVENT_ID} from "./const";

export namespace IFeedbackController{

    export interface FindAll extends IModelAttributes.IFeedback{

        creator: Partial<IModelAttributes.IClient>

    }
}

export namespace IWebSocketController{

    export interface Send<T>{
        eventId: WS_EVENT_ID | WS_BASE_EVENT_ID,
        payload: T,
    }
}


export namespace IExpressWrapperController{

    export interface Delete{
        success: boolean;
    }
}