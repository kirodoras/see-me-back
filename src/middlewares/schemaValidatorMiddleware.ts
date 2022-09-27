import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export function body(schema: Schema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      const { message } = error.details[0];
      throw { type: "unprocessable_entity", message };
    }
    next();
  };
}
