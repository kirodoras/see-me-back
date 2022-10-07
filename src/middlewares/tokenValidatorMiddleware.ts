import { NextFunction, Request, Response } from "express";
import * as jwtProvider from "../providers/jwtProvider";
import * as usersService from "../services/usersService";

type Payload = {
  email: string;
  iat: number;
  exp: number;
};

export async function tokenValidator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  const token: string | undefined = authorization?.replace("Bearer ", "");

  if (!token) {
    throw { type: "unauthorized", message: "Invalid token format" };
  }

  const payload = jwtProvider.decode(token);
  const { email } = payload as Payload;

  if (!email) {
    throw { type: "unauthorized", message: "Invalid request" };
  }

  const user = await usersService.find(email);
  const user_id: number = +user.id;
  res.locals.user_id = user_id;

  next();
}
