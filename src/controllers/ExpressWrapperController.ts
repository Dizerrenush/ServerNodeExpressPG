
import type BaseController from "./BaseController";
import type {Request, Response} from "express";
import {IModelAttributes} from "../models/types/types";
import type {WebSocketController} from "@/controllers/WebSocketController";
import {WS_BASE_EVENT_ID} from "./types/const";

const modelNotFount = 'Can not find model';

export default class ExpressWrapperController<I extends IModelAttributes.IBase> {

    private readonly _controller: BaseController<I>;
    private readonly _wsController: WebSocketController;

    constructor(controller: BaseController<I>, wsConnection: WebSocketController) {
        this._controller = controller;
        this._wsController = wsConnection;
    }

    async findAll(req: Request, res: Response) {
        const query = req.query;
        const limit = query.limit as number | undefined;
        const offset = query.offset as number | undefined;
        const where = {};
        const options={
            limit,
            offset,
            where,
        };


        this._controller.findAll(options).then(data => {
            if (data) {
                return res.json(data)
            }

            return res.json({
                msg: 'Records not found',
                status: 404,
                route: "/list"
            });
        })

    }

    async create(req: Request, res: Response) {
        try {
            this._controller.create({...req.body}).then(data => {
                const event = this._controller.getEventId(WS_BASE_EVENT_ID.CREATED);

                this._wsController.send({
                    event: event,
                    payload: data,
                });

                return res.json(data);
            });
        } catch (e) {
            return res.json({
                msg: e,
                status: 500,
                route: "/create"
            });
        }
    }

    async find(req: Request, res: Response) {
            const {id} = req.params;
            this._controller.findOne({where: {id}}).then(data => {
                if(data){
                    return res.json({data})
                }
                return res.json({
                    msg: modelNotFount,
                    status: 500,
                    route: "/find/:id",
                });
            })
    }

    async update(req: Request, res: Response) {

        const {id} = req.params;

        try {

            this._controller.findOne({where: {id}}).then(data => {
                return res.json({data})
            })

        } catch (e) {
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

            this._controller.findOne({where: {id}}).then(() => {
                return res.json({msg: "model deleted"})
            })

        } catch (e) {
            return res.json({
                msg: e,
                status: 500,
                route: "/delete/:id",
            });
        }
    }

}