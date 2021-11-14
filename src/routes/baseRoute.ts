
import express from 'express';
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {BaseValidator} from '../validation/base';
import {IModelAttributes} from "@/models/types/types";

export function createRoute <I extends IModelAttributes.IBase,V extends BaseValidator>(controller: ExpressWrapperController<I>, validator: V ){

    const router = express.Router();

    router.post(
        '/create',
        validator.checkCreate(),
        controller.create.bind(controller)
    );

    router.get(
        '/read',
        validator.checkRead(),
        controller.findAll.bind(controller)
    );

    router.get(
        '/read/:id',
        validator.checkIdParam(),
        controller.find.bind(controller)
    );

    router.put(
        '/update/:id',
        validator.checkIdParam(),
        controller.update.bind(controller)
    );

    router.delete(
        '/delete/:id',
        validator.checkIdParam(),
        controller.delete.bind(controller)
    );

    return router;
}
