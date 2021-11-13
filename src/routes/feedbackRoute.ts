
import type{IControllerItem} from "../controllers/types/types";
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {FeedbackValidator} from '../validation/feedback';
import {createRoute} from "./baseRoute";

export default function createFeedbackRoute(controller: ExpressWrapperController<IControllerItem.IClient>,validator: FeedbackValidator ) {

    return createRoute(controller,validator) ;

}