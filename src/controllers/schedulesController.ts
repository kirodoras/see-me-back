import { Request, Response } from "express";
import * as schedulesService from "../services/schedulesService";
import { TSchedule } from "../types/schedulesTypes";

async function create(req: Request, res: Response) {
  const schedule: TSchedule = req.body;
  const user_id = res.locals.user_id;
  const result = await schedulesService.create({ ...schedule, user_id });
  res.status(201).send(result);
}

export { create };
