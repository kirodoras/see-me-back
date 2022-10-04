import { Router, Request, Response } from "express";
import usersRouter from "./usersRouter";
import tokenRouter from "./tokenRouter";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Online");
});
router.use(usersRouter);
router.use(tokenRouter);

export default router;
