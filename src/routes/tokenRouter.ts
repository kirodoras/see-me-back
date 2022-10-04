import { Router } from "express";
import { generateToken } from "../controllers/tokenController";
import { noCache } from "../middlewares/noCacheMiddleware";

const tokenRouter = Router();

const PATH = "/token";

tokenRouter.get(`${PATH}`, noCache, generateToken);

export default tokenRouter;
