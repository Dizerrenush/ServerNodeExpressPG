
import { param, query} from 'express-validator';

export class BaseValidator {
    checkCreate() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
        ];
    }
    checkIdParam() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isNumeric()
                .withMessage('The value should be number'),
        ];
    }
}

export default new BaseValidator();