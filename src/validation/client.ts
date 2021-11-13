import { body } from 'express-validator';
import { BaseValidator } from './base'
export class ClientValidator extends BaseValidator{
    checkCreate() {
        return [
            body('fullname')
                .notEmpty()
                .withMessage('The fullname value should not be empty'),
            body('email')
                .notEmpty()
                .withMessage('The email value should not be empty'),
        ];
    }
}

export default new ClientValidator();