import express from 'express';
import FeedbackValidator from '../validation/feedback';
import ExpressWrapperController from '../controllers/ExpressWrapperController';
import {FeedbackController} from '../controllers/FeedbackController';

const Controller = new FeedbackController();
const Feedback = new ExpressWrapperController(Controller);

const router = express.Router();

router.post(
    '/create',
    FeedbackValidator.checkCreate(),
    Feedback.create
);

router.get(
    '/read',
    FeedbackValidator.checkRead(),
    Feedback.findAll
);

router.get(
    '/read/:id',
    FeedbackValidator.checkIdParam(),
    Feedback.find
);

router.put(
    '/update/:id',
    FeedbackValidator.checkIdParam(),
    Feedback.update
);

router.delete(
    '/delete/:id',
    FeedbackValidator.checkIdParam(),
    Feedback.delete
);

export default router;