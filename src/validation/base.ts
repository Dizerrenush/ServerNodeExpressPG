
import { param, query} from 'express-validator';

export class BaseValidator {
    checkCreate() {
        return [
            param('id')
                .notEmpty()
                .withMessage('The value should be not empty')
                .isNumeric()
                .withMessage('The value should be number')
        ];
    }
    checkRead() {
        return [
            query('limit')
                .optional()
                .isNumeric()
                .withMessage('The value should be number')
                .isInt({ min: 1, max: 10 })
                .withMessage('The limit value should be number and between 1-10'),
            query('offset')
                .optional()
                .isNumeric()
                .withMessage('The value should be number'),
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