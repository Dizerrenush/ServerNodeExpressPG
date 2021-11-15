
import {IControllerMethods} from "./types/types";
import {IModelAttributes} from "../models/types/types";
import {ModelCtor, Model} from "sequelize";
import {WS_CREATE_EVENTS} from "./types/const";

export default abstract class BaseController<I extends IModelAttributes.IBase> {

    private _model: ModelCtor<Model<I>>;

    constructor(model: ModelCtor<Model<I>>) {
        this._model = model;
    }

    async create(item: I): Promise<I> {
        try {
            const model = await this._model.create(item);
            return model.get({plain: true});
        }
        catch (e: any) {
            throw new Error(e)
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
        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async findOne(id: string): Promise<I | string> {
        try {
            const model = await this._model.findOne({raw: true, where: {id}});

            if (model) {
                return model.get({plain: true});
            }

            return 'Not Found 400'

        }
        catch (e: any) {
            throw new Error(e)
        }

    }

    async update(id: number, data: I): Promise<I | string> {
        try {

            const model = await this._model.findOne({where: {id}});

            if (model) {
                await model.update({...data});
                return model.get({plain: true});
            }

            return 'Not Found 400'

        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    async delete(id: number): Promise<void | string> {
        try {

            const model = await this._model.findOne({where: {id}});

            if (model) {
                return await model.destroy();
            }

            return 'Not Found 400'

        }
        catch (e: any) {
            throw new Error(e)
        }
    }

    createEvent(event: number): number {

        switch (event) {
            case WS_CREATE_EVENTS.CREATED:
                return WS_CREATE_EVENTS.CREATED;
            case WS_CREATE_EVENTS.UPDATED:
                return WS_CREATE_EVENTS.UPDATED;
            case WS_CREATE_EVENTS.DELETED:
                return WS_CREATE_EVENTS.DELETED;
            default: return WS_CREATE_EVENTS.NONE

        }
    }
}
