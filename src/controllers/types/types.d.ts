
export namespace IControllerMethods {

    export interface IFindAllOptions {
        limit?: number;
        offset?: number;
        include?: string
    }

}
export namespace IBaseControllerMethods {
    export interface ICreateOptions {
        include?: string
    }
}
export namespace IWebSocketController {

    export interface IData {

        type: number
        payload: any
    }

}
