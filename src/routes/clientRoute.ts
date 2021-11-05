
import express from 'express';
import ClientController from '../controllers/ClientController';

const router = express.Router();

router.post('/', ClientController.create());
router.get('/', ClientController.find());
router.get('/:id', ClientController.findAll());
router.put('/:id', ClientController.update());
router.delete('/:id', ClientController.delete());

module.exports = router;