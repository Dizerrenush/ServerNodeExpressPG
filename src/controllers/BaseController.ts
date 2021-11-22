
import {IModelAttributes} from "../models/types/types";
import {ModelCtor, Model, FindOptions, CreateOptions, NonNullFindOptions, UpdateOptions} from "sequelize";
import {WS_BASE_EVENT_ID} from "./types/const";

export default abstract class BaseController<I extends IModelAttributes.IBase> {

    protected _model: ModelCtor<Model<I>>;

    constructor(model: ModelCtor<Model<I>>) {
        this._model = model;
    }

    async create(item: I, options?: CreateOptions<I>): Promise<I> {
        try {
            const model = await this._model.create(item, options);

            return model.get({plain: true});
        } catch (e: any) {
            throw new Error(e)
        }
    }

    async findAll(options: FindOptions<I>): Promise<I[] | void> {
        const models = await this._model.findAll(options);

        return models.map(el => el.get({plain: true}));
    }

    async findOne(options: FindOptions<I>): Promise<I | void> {
        const item = await this._model.findOne(options);

        if (item) {
            return item.get({plain: true});
        }

        return void 0;
    }

    async update(item: Partial<I>,options: FindOptions<I>): Promise<I | void> {
        const model = await this._model.findOne(options);

        if (model) {
            await model.update({...item});
            return model.get({plain: true});
        }

        return void 0;
    }

    async delete(options: NonNullFindOptions<I>): Promise<void | string> {
        const model = await this._model.findOne(options);

        if (model) {
            return await model.destroy();
        }
        //TODO error
        return void 0;
    }

    getEventId(eventId: WS_BASE_EVENT_ID): WS_BASE_EVENT_ID {
        return eventId;
    }
}
