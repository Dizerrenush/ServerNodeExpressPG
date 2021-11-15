
import {IModel,IModelAttributes} from "@/models/types/types";

export namespace IController{

    export interface IBase<T extends IModel.TBase>{

        create<I extends IModelAttributes.IBase>(item: I): T|null
        findAll()
        findOne()
        update(I)
        delete()
    }

}

export namespace IControllerMethods {

    export interface IFindAllOptions{
        limit?: number;
        offset?: number;
    }

}

export namespace IWebSocketController{

    export interface IData{

        event:number
        payload:IPayload
    }

    export interface IPayload {

        id:number

    }
}
