import { Request, Response } from "express";
import * as schedulesService from "../services/schedulesService";
import { TSchedule } from "../types/schedulesTypes";

async function create(req: Request, res: Response) {
  const schedule: TSchedule = req.body;
  const user_id = +res.locals.user_id;
  const result = await schedulesService.create({ ...schedule, user_id });
  res.status(201).send(result);
}

async function findSchedulesByUserId(req: Request, res: Response) {
  const user_id = +res.locals.user_id;
  const result = await schedulesService.findSchedulesByUserId(user_id);
  res.status(200).send(result);
}

async function deleteById(req: Request, res: Response) {
  const user_id = +res.locals.user_id;
  const id = +req.params.id;
  const result = await schedulesService.deleteById(user_id, id);
  res.status(200).send(result);
}

export { create, findSchedulesByUserId, deleteById };
