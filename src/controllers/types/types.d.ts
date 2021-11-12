
export namespace IControllerItem {

    export interface IBase {
        id: number;
    }

    export interface IClient extends IBase {
        id: number;
        fullname: string;
        email?: string;
    }

    export interface IFeedback extends IBase{
        id: number;
        client_id: number;
        description: string;
    }

}

export namespace IControllerMethods {

    export interface IFindAllOptions{
        limit?: number;
        offset?: number;
    }

    export interface IClient extends IBase {
        id: number;
        fullname: string;
        email?: string;
    }

    export interface IFeedback extends IBase{
        id: number;
        client_id: number;
        description: string;
    }

}
