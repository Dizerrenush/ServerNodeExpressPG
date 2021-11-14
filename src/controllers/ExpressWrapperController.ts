
import type BaseController from "./BaseController";
import type {Request, Response} from "express";
import {IModelAttributes} from "../models/types/types";

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
            this._controller.findAll(options).then(data => {
                return res.json(data)
            })
        }
        catch (e) {
            return res.json({
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                msg: e.toString(),
                status: 500,
                route: "/list"
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            this._controller.create({...req.body}).then(data => {
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
             this._controller.findOne(id).then(data => {
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

            this._controller.findOne(id).then(data => {
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

            this._controller.findOne(id).then(() => {
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