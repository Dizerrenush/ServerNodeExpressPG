import type {Request, Response} from "express";

import db from '../database/connect';
import Model from "../models/feedback.model";
import iFeedback from "@/validation/feedback";
import BaseController from "@/controllers/BaseController";

const ModelInstance = Model(db);

export default class FeedbackController extends BaseController<IFeedbackController>{

}
