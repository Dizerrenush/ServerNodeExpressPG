
import { body } from 'express-validator';
import { BaseValidator } from './base'

export class FeedbackValidator extends BaseValidator{

    checkCreate() {
        return [
            body('description')
                .notEmpty()
                .withMessage('The description value should not be empty'),
            body('email')
                .notEmpty()
                .withMessage('The email value should not be empty')
        ];
    }

}

export default new FeedbackValidator();