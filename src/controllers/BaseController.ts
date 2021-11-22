
import {IModelAttributes} from "../models/types/types";
import {ModelCtor, Model, FindOptions, CreateOptions} from "sequelize";
import {WS_BASE_EVENT_ID} from "./types/const";
import {IExpressWrapperController} from "./types/types";

export default abstract class BaseController<I extends IModelAttributes.IBase> {

    protected _model: ModelCtor<Model<I>>;

    constructor(model: ModelCtor<Model<I>>) {
        this._model = model;
    }

    async create(item: I, options?: CreateOptions<I>): Promise<I> {
        const model = await this._model.create(item, options);

        return model.get({plain: true});

    }

    async findAll(options: FindOptions<I>): Promise<I[] | []> {
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

    async update(item: Partial<I>, options: FindOptions<I>): Promise<I | void> {
        const model = await this._model.findOne(options);

        if (model) {
            await model.update({...item});
            return model.get({plain: true});
        }

        return void 0;
    }

    async delete(options: FindOptions<I>): Promise<IExpressWrapperController.Delete> {
        const model = await this._model.findOne(options);

        if (model) {
            await model.destroy();
            return {success: true};
        }

        return {success: false};
    }

    getEventId(eventId: WS_BASE_EVENT_ID): WS_BASE_EVENT_ID {
        return eventId;
    }
}
