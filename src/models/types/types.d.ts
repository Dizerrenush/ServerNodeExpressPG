
export namespace IModelAttributes {

    export interface IBase {
        id?: number;
    }

    export interface IClient extends IBase {
        fullname?: string;
        email: string;
    }

    export interface IFeedback extends Partial<IClient> {
        description: string;
        creatorId?: number;
    }

}
