import type {Request, Response} from "express";

import db from '../database/connect';
import Model from "../models/feedback.model";

const ModelInstance = Model(db);

//TODO interface IControllerItem
export default abstract class BaseController <T extends IControllerItem> {
    async create(item: T) {
        //TODO validation

        try {
            return ModelInstance.create(item);
        }catch (e){

        }


    }

    async findAll(req: Request, res: Response) {
        try {
            const limit = (req.query.limit as number | undefined) || 10;
            const offset = req.query.offset as number | undefined;

            const models = await ModelInstance.findAll({where: {}, limit, offset});
            return res.json(models);
        } catch (e) {
            return res.json({
                msg: "fail to find all",
                status: 500,
                route: "/list"
            });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const model = await ModelInstance.findOne({where: {id}});

            if (!model) {
                return res.json({msg: "Can not find model"});
            }

            return res.json({model, msg: "model find"});

        } catch (e) {
            return res.json({
                msg: "fail to get",
                status: 500,
                route: "/find/:id",
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const model = await ModelInstance.findOne({where: {id}});

            if (!model) {
                return res.json({msg: "Can not find model"});
            }

            const updatedModel = await model.update({...req.body});
            return res.json({updatedModel, msg: "model updated"});

        } catch (e) {
            return res.json({
                msg: "fail to update",
                status: 500,
                route: "/update/:id",
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const model = await ModelInstance.findOne({where: {id}});

            if (!model) {
                return res.json({msg: "Can not find model"});
            }

            const deletedModel = await model.destroy();
            return res.json({deletedModel, msg: "Model deleted"});

        } catch (e) {
            return res.json({
                msg: "fail to delete",
                status: 500,
                route: "/delete/:id",
            });
        }
    }
}
