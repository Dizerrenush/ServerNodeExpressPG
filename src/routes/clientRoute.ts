
import type{IControllerItem} from "../controllers/types/types";
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {ClientValidator} from '../validation/client';
import {createRoute} from "./baseRoute";

export default function createClientRoute(controller: ExpressWrapperController<IControllerItem.IClient>,validator: ClientValidator ) {

    return createRoute(controller,validator) ;

}
