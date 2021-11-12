import express from 'express';
import ClientValidator from '../validation/client';
import ExpressWrapperController from '../controllers/ExpressWrapperController';
import {ClientController} from "@/controllers/ClientController";

const Client = new ExpressWrapperController(ClientController)

const router = express.Router();

router.post(
    '/create',
    ClientValidator.checkCreate(),
    Client.create
);

router.get(
    '/read',
    ClientValidator.checkRead(),
    Client.findAll
);

router.get(
    '/read/:id',
    ClientValidator.checkIdParam(),
    Client.find
);

router.put(
    '/update/:id',
    ClientValidator.checkIdParam(),
    ClientController.update
);

router.delete(
    '/delete/:id',
    ClientValidator.checkIdParam(),
    ClientController.delete
);

export default router;