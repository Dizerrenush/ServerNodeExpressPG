
import {IControllerMethods} from "@/controllers/types/types";
import type {ModelCtor} from "sequelize-typescript";
import {IModelAttributes} from "@/models/types/types";
import {Model} from "sequelize-typescript";

export default abstract class BaseController<T,I extends IModelAttributes.IBase>{

    private _model: ModelCtor<Model<I>>;

    constructor(model: T) {
        this._model = model;
    }

    async create(item:I) {

        try {
            return this._model.create(item);
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

    async update(id: number, data: I) {
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
