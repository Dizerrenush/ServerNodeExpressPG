
import express from 'express';
import type ExpressWrapperController from "../controllers/ExpressWrapperController";
import type {BaseValidator} from '../validation/base';
import BaseController from "@/controllers/BaseController";
import {ModelCtor} from "sequelize-typescript";

export function createRoute <C extends BaseController<ModelCtor>,V extends BaseValidator>(controller: ExpressWrapperController<C>, validator: V ){

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
