
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {FeedbackValidator} from "../validation/feedback";
import {createRoute} from "./baseRoute";
import {IModelAttributes} from "../models/types/types";

export default function createFeedbackRoute(controller: ExpressWrapperController<IModelAttributes.IFeedback>, validator: FeedbackValidator) {

    return createRoute(controller, validator);

}