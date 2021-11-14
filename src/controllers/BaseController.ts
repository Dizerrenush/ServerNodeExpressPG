
import {IControllerMethods} from "@/controllers/types/types";
import type {ModelCtor} from "sequelize-typescript";
import {IModelAttributes} from "@/models/types/types";


export default abstract class BaseController<T extends ModelCtor>{

    private _model: T;

    constructor(model: T) {
        this._model = model;
    }

    async create<I extends IModelAttributes.IBase>(item:I): {

        try {
            return JSON.stringify(this._model.create(item));
        }
        catch (e) {
            console.log(e)
        }

    }

    async findAll(options: IControllerMethods.IFindAllOptions) {
        try {

            const limit = options.limit;
            const offset = options.offset;

            return this._model.findAll({where: {}, limit, offset});
        }
        catch (e) {
            console.log(e)
        }
    }

    async findOne(id: string) {
        try {
            return this._model.findOne({where: {id}});

        }
        catch (e) {
            console.log(e)
        }
    }

    async update<I extends IModelAttributes.IBase>(id: number, data: I) {
        try {

            const model = await this._model.findOne({where: {id}});

            if (model) {
                return model.update({...data});
            }

            return false;

        }
        catch (e) {
            console.log(e)
        }
    }

    async delete(id: number) {
        try {

            const model = await this._model.findOne({where: {id}});

            if (model) {
                return await model.destroy();
            }

            return false;

        }
        catch (e) {
            console.log(e)
        }
    }
}
