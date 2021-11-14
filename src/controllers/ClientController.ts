
import BaseController from "./BaseController";
import type {ModelCtor} from "sequelize-typescript";
import {IModelAttributes} from "@/models/types/types";
import {Model} from "sequelize-typescript";

export class ClientController extends BaseController<ModelCtor<Model<IModelAttributes.IClient>>> {
}
