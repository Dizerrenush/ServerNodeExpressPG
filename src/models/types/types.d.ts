
import type { Model, Optional} from "sequelize";

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

export namespace IModelCreationAttributes {

    export type IBase = Optional<IModelAttributes.IBase, "id">

    export type IClient = Optional<IModelAttributes.IClient, "id">

    export type IFeedback = Optional<IModelAttributes.IFeedback, "id">

}

export namespace IModel {

    export interface IClient
        extends Model<IModelAttributes.IClient, IModelCreationAttributes.IClient>,
            IModelCreationAttributes.IClient {
    }

    export interface IFeedback
        extends Model<IModelAttributes.IFeedback, IModelCreationAttributes.IFeedback>,
            IModelCreationAttributes.IFeedback {
    }

}
