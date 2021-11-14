
import {IControllerMethods} from "@/controllers/types/types";
import type {ModelCtor} from "sequelize-typescript";
import {IModelAttributes} from "@/models/types/types";
import {Model} from "sequelize-typescript";

export default abstract class BaseController<I extends IModelAttributes.IBase>{

    private _model: ModelCtor<Model<I>>;

    constructor(model: ModelCtor<Model<I>>) {
        this._model = model;
    }

    async create(item: I): Promise<I | undefined> {

        try {
            const model = await this._model.create(item);
            return model.get({plain:true});
        }
        catch (e) {
            console.log(e)
        }

    }

    async findAll(options: IControllerMethods.IFindAllOptions): Promise<I[]> {
        try {

            const limit = options.limit;
            const offset = options.offset;

            const model = await this._model.findAll({where: {}, limit, offset});
            return model.every()
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
