import { NextFunction, Request, Response } from "express";

interface ErrorObject extends Error {
  type: string;
  message: string;
}

export function errorHandler(
  error: ErrorObject,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  console.log(error);
  const { message, type } = error;

  if (type === "conflict") {
    return res.status(409).send(message ? message : "Conflict");
  }
  if (type === "not_found") {
    return res.status(404).send(message ? message : "Not found");
  }
  if (type === "unauthorized") {
    return res.status(401).send(message ? message : "Unauthorized");
  }
  if (type === "unprocessable_entity") {
    return res.status(422).send(message ? message : "Unprocessable entity");
  }
  res.sendStatus(500);
}
