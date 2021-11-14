
import type BaseController from "./BaseController";
import type {Request, Response} from "express";
import {IModelAttributes} from "@/models/types/types";

export default class ExpressWrapperController<I extends IModelAttributes.IBase> {

    private readonly _controller: BaseController<I>;

    constructor(controller: BaseController<I>) {
        this._controller = controller;
    }

    async findAll(req: Request, res: Response) {
        const query = req.query;
        const limit = (query.limit as number | undefined) || 10;
        const offset = query.offset as number | undefined;
        const options = {
            limit: limit,
            offset: offset,
        };

        try {
            const models = this._controller.findAll(options);
            models.then(data => {
                return res.json(data)
            })
        }
        catch (e) {
            return res.json({
                msg: e,
                controller: this._controller,
                status: 500,
                route: "/list"
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const model = this._controller.create({...req.body});
            model.then(data => {
                return res.json({data, msg: "Successfully create model"})
            });
        }
        catch (e) {
            return res.json({
                msg: e,
                status: 500,
                route: "/create"
            });
        }
    }

    async find(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const model = this._controller.findOne(id);
            model.then(data => {
                return res.json({data})
            })
        }
        catch (e) {
            return res.json({
                msg: e,
                status: 500,
                route: "/find/:id",
            });
        }
    }

    async update(req: Request, res: Response) {

        const {id} = req.params;

        try {

            const model = this._controller.findOne(id);
            model.then(data => {
                return res.json({data, msg: "model updated"})
            })

        }
        catch (e) {
            return res.json({
                msg: e,
                status: 500,
                route: "/update/:id",
            });
        }
    }

    async delete(req: Request, res: Response) {

        const {id} = req.params;

        try {

            const model =  this._controller.findOne(id);
            model.then(() => {
                return res.json({ msg: "model deleted"})
            })

        }
        catch (e) {
            return res.json({
                msg: e,
                status: 500,
                route: "/delete/:id",
            });
        }
    }

}