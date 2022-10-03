import { Router, Request, Response } from "express";
import usersRouter from "./usersRouter";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Online");
});
router.use(usersRouter);

export default router;
