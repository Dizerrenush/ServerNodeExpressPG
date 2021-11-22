import type 
    IModelAttributes} from "@/models/types/types";

export namespace IFeedbackController{

    export interface IFeedbackFindAll extends IModelAttributes.IFeedback{

        creator: Partial<IModelAttributes.IClient>

    }
}