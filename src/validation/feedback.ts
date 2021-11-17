
import { body } from 'express-validator';
import { BaseValidator } from './base'

export class FeedbackValidator extends BaseValidator{

    checkCreate() {
        return [
            body('description')
                .notEmpty()
                .withMessage('The description value should not be empty'),
            body('clientId')
                .notEmpty()
                .withMessage('The clientId value should not be empty'),
        ];
    }

}

export default new FeedbackValidator();