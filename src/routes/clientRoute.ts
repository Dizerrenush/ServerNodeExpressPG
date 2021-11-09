import express from 'express';
import ClientValidator from '../validation/client';
import ClientController from '../controllers/ClientController';

const router = express.Router();

router.post(
    '/create',
    ClientValidator.checkCreate(),
    ClientController.create
);

router.get(
    '/read',
    ClientValidator.checkRead(),
    ClientController.findAll
);

router.get(
    '/read/:id',
    ClientValidator.checkIdParam(),
    ClientController.find
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