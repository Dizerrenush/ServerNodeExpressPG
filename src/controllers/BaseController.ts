import db from '../database/connect';
import Model from "../models/feedback.model";
import {IControllerItem, IControllerMethods} from "@/controllers/types/types";

const ModelInstance = Model(db);

export default abstract class BaseController<T extends IControllerItem.IBase> {

    async create(item: T) {

        try {
            return ModelInstance.create(item);
        } catch (e) {

        }

    }

    async findAll(options: IControllerMethods.IFindAllOptions) {
        try {
            const limit = options.limit;
            const offset = options.offset;
            return ModelInstance.findAll({where: {}, limit, offset});
        } catch (e) {

        }
    }

    async findOne(id: number) {
        try {
            return ModelInstance.findOne({where: {id}});

        } catch (e) {

        }
    }

    async update(id: number, data: T) {
        try {

            const model = await ModelInstance.findOne({where: {id}});

            if (model) {
                return model.update({...data});
            }

            return false;

        } catch (e) {

        }
    }

    async delete(id: number) {
        try {

            const model = await ModelInstance.findOne({where: {id}});

            if (model) {
                return await model.destroy();
            }

            return false;

        } catch (e) {

        }
    }
}
