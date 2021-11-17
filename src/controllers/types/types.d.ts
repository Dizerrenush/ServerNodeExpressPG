
export namespace IControllerMethods {

    export interface IFindAllOptions {
        limit?: number;
        offset?: number;
        include?: Array<IIncludeOptions>
    }

    interface IIncludeOptions {

        model: string;
        required?: boolean;
    }


}

export namespace IWebSocketController {

    export interface IData {

        event: number
        payload: IPayload
    }

    export interface IPayload {

        id: number

    }
}
