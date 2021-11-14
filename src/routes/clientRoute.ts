
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {ClientValidator} from '../validation/client';
import {createRoute} from "./baseRoute";
import {IModelAttributes} from "@/models/types/types";

export default function createClientRoute(controller: ExpressWrapperController<IModelAttributes.IClient>, validator: ClientValidator) {

    return createRoute(controller, validator);

}
