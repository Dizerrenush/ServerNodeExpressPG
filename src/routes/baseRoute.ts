
import express from 'express';
import {validationResult } from 'express-validator';
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {BaseValidator} from '../validation/base';
import {IModelAttributes} from "@/models/types/types";

export function createRoute <I extends IModelAttributes.IBase,V extends BaseValidator>(controller: ExpressWrapperController<I>, validator: V ){

    const router = express.Router();

    router.post(
        '/create',
        validator.checkCreate(),
        (req: express.Request, res: express.Response) => {
            // Finds the validation errors in this request and wraps them in an object with handy functions
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({errors: errors.array()});
            }
            controller.create.bind(controller)
        }
    );

    router.get(
        '/get',
        controller.findAll.bind(controller)
    );

    router.get(
        '/get/:id',
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
