import { Router, Request, Response } from "express";
import usersRouter from "./usersRouter";
import tokenRouter from "./tokenRouter";
import schedulesRouter from './schedulesRouter';

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Online");
});
router.use(usersRouter);
router.use(tokenRouter);
router.use(schedulesRouter);

export default router;
