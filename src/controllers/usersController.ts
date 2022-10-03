import { Request, Response } from "express";
import * as usersService from "../services/usersService";
import { TUser } from "../types/usersTypes";

async function create(req: Request, res: Response) {
  const user: TUser = req.body;
  const result = await usersService.create(user);
  res.status(201).send(result);
}

async function find(req: Request, res: Response) {
  const { email } = req.body;
  const result = await usersService.find(email);
  res.status(200).send(result);
}

export { create, find };
