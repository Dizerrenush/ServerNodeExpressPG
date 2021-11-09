
import type {Request, Response} from "express";

import db from '../database/connect';
import Model from "../models/client.model";
import BaseController from "@/controllers/BaseController";

const ModelInstance = Model(db);

export class ClientController extends BaseController<IClientController>{

    async create(req: Request, res: Response) {
        try {
            const model = await ModelInstance.create({ ...req.body });
            return res.json({ model, msg: "Successfully create model" });
        } catch (e) {
            return res.json({
                msg: "fail to create",
                status: 500,
                route: "/create"
            });
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

export default new ClientController();
