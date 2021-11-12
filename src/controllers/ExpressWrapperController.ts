
import type BaseController from "@/controllers/BaseController";
import {Request, Response} from "express";
import {IControllerItem} from "@/controllers/types/types";

export default class ExpressWrapperController<T extends IControllerItem.IBase> {
    _controller;
    constructor(controller: BaseController<T>) {
        this._controller = controller;
    }

    async findAll(req: Request, res: Response) {
        const query = req.query;
        const limit = (query.limit as number | undefined) || 10;
        const offset = query.offset as number | undefined;
        const options = {
            limit:limit,
            offset:offset,
        }
        try {
            const models = await this._controller.findAll(options)
            return res.json(models);
        } catch (e) {
            return res.json({
                msg: "fail to find all",
                status: 500,
                route: "/list"
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const model = await this._controller.create({ ...req.body });
            return res.json({ model, msg: "Successfully create model" });
        } catch (e) {
            return res.json({
                msg: "fail to create",
                status: 500,
                route: "/create"
            });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const model = await this._controller.findOne(id);

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
            const model = await this._controller.findOne(id);

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
            const model = await this._controller.findOne(id);

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