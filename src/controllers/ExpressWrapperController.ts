
import type BaseController from "@/controllers/BaseController";
import {Request, Response} from "express";

export default class ExpressWrapperController<T extends IControllerItem> {
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
            const models = await this._controller.findAll(filter,options)
            return res.json(models);
        } catch (e) {
            return res.json({
                msg: "fail to find all",
                status: 500,
                route: "/list"
            });
        }
    }

}