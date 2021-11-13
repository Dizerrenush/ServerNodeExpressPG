
export namespace IControllerItem {

    export interface IBase {
        id: number;
    }

    export interface IClient extends IBase {
        fullname: string;
        email?: string;
    }

    export interface IFeedback extends IBase{
        client_id: number;
        description: string;
    }

}

export namespace IControllerMethods {

    export interface IFindAllOptions{
        limit?: number;
        offset?: number;
    }

}
