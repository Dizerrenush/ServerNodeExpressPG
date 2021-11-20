
export namespace IModelAttributes {

    export interface IBase {
        id: number;
    }

    export interface IClient extends IBase {
        fullname?: string;
        email: string;
    }

    export interface IFeedback extends IBase {
        description: string;
        creatorId?: number;
    }

    export interface IFeedbackClient extends IFeedback {
        client?: IClient
    }

}

export namespace IFullAttributes{

    export interface IClientFeedback extends IModelAttributes.IFeedback, IModelAttributes.IFeedback{


    }

}