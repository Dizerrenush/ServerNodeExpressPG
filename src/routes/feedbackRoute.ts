
import type {FeedbackController} from "../controllers/FeedbackController";
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {FeedbackValidator} from '../validation/feedback';
import {createRoute} from "./baseRoute";

export default function createFeedbackRoute(controller: ExpressWrapperController<FeedbackController>,validator: FeedbackValidator ) {

    return createRoute(controller,validator) ;

}