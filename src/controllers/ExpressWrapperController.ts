
import type BaseController from "./BaseController";
import type {Request, Response} from "express";
import {IModelAttributes} from "../models/types/types";
import type {WebSocketController} from "./WebSocketController";
import {WS_BASE_EVENT_ID} from "./types/const";
import {IWebSocketController} from "./types/types";

export default class ExpressWrapperController<I extends IModelAttributes.IBase> {

    private readonly _controller: BaseController<I>;
    private readonly _wsController: WebSocketController;

    constructor(controller: BaseController<I>, wsConnection: WebSocketController) {
        this._controller = controller;
        this._wsController = wsConnection;
    }

    async findAll(req: Request, res: Response): Promise<void> {
        const query = req.query;
        const limit = query.limit as number | undefined;
        const offset = query.offset as number | undefined;
        const where = {};
        const options = {
            limit,
            offset,
            where,
        };
        const data = await this._controller.findAll(options);

        res.json(data);
    }

    async create(req: Request, res: Response): Promise<void> {
        const payload = await this._controller.create({...req.body});
        const eventId = this._controller.getEventId(WS_BASE_EVENT_ID.CREATED);

        this._wsController.send<IWebSocketController.Send<I>>({
            eventId,
            payload,
        });

        res.json(payload);
    }

    async find(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const data = await this._controller.findOne({where: {id}});

        res.json(data);
    }

    async update(req: Request, res: Response): Promise<I | void> {
        const {id} = req.params;
        const data = await this._controller.findOne({where: {id}});

        res.json(data);
    }

    async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params;
        const data = await this._controller.delete({where: {id}});

        res.json(data);
    }

}