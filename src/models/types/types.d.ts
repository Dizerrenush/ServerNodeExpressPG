
export namespace IModelAttributes {

    export interface IBase {
        id: number;
    }

    export interface IClient extends IBase{
        fullname: string;
        email: string;
    }

    export interface IFeedback extends IBase{
        description: string;
        clientId: number;
    }

}