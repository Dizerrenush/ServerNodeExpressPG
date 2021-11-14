
import {IControllerMethods} from "@/controllers/types/types";
import {IModelAttributes} from "@/models/types/types";
import {ModelCtor,Model} from "sequelize-typescript";

export default abstract class BaseController<I extends IModelAttributes.IBase> {

    private _model: ModelCtor<Model<I>>;

    constructor(model: ModelCtor<Model<I>>) {
        this._model = model;
    }

    async create(item: I): Promise<I> {
        try {
            const model = await this._model.create(item);
            return model.get({plain: true});
        } catch (e: any) {
            return Promise.reject(new Error(e.toString()));
        }
    }

    async findAll(options: IControllerMethods.IFindAllOptions): Promise<I[]> {
        const limit = options.limit;
        const offset = options.offset;
        try {
            const models = await this._model.findAll({
                where: {},
                limit,
                offset
            });

            return models.map(el => el.get({plain: true}));
        } catch (e: any) {
            return Promise.reject(new Error(e.toString()));
        }
    }

    async findOne(id: string): Promise<I> {
        try {
            const model = await this._model.findOne({raw: true, where: {id}});

            if (model) {
                return model.get({plain: true});
            } else {
                return Promise.reject(new Error('400'))
            }
        } catch (e: any) {
            return Promise.reject(new Error(e.toString()));
        }

    }

    async update(id: number, data: I): Promise<I> {
        try {

            const model = await this._model.findOne({where: {id}});

            if (model) {
                await model.update({...data});
                return model.get({plain: true});
            } else {
                return Promise.reject(new Error('400'))
            }

        } catch (e: any) {
            return Promise.reject(new Error(e.toString()));
        }
    }

    async delete(id: number): Promise<void> {
        try {

            const model = await this._model.findOne({where: {id}});

            if (model) {
                return await model.destroy();
            } else {
                return Promise.reject(new Error('400'))
            }

        } catch (e: any) {
            return Promise.reject(new Error(e.toString()));
        }
    }
}
