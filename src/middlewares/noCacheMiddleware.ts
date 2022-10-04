import { NextFunction, Request, Response } from "express";

function noCache(req: Request, res: Response, next: NextFunction) {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");
  next();
}

export { noCache };
