

import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {ClientValidator} from '../validation/client';
import {createRoute} from "./baseRoute";
import type {ClientController} from "@/controllers/ClientController";

export default function createClientRoute(controller: ExpressWrapperController<ClientController>,validator: ClientValidator ) {

    return createRoute(controller,validator) ;

}
