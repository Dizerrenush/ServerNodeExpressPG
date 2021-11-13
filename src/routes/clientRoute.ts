import express from 'express';
import ClientValidator from '../validation/client';
import ExpressWrapperController from '../controllers/ExpressWrapperController';
import {ClientController} from "../controllers/ClientController";

const Controller = new ClientController();
const Client = new ExpressWrapperController(Controller)

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
    Client.update
);

router.delete(
    '/delete/:id',
    ClientValidator.checkIdParam(),
    Client.delete
);

export default router;