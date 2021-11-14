
import express from 'express';
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {BaseValidator} from '../validation/base';
import {IModelAttributes} from "@/models/types/types";

export function createRoute <I extends IModelAttributes.IBase,V extends BaseValidator>(controller: ExpressWrapperController<I>, validator: V ){

    const router = express.Router();

    router.post(
        '/create',
        validator.checkCreate(),
        controller.create
    );

    router.get(
        '/read',
        validator.checkRead(),
        controller.findAll
    );

    router.get(
        '/read/:id',
        validator.checkIdParam(),
        controller.find
    );

    router.put(
        '/update/:id',
        validator.checkIdParam(),
        controller.update
    );

    router.delete(
        '/delete/:id',
        validator.checkIdParam(),
        controller.delete
    );

    return router;
}
