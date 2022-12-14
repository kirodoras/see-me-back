import { Router } from "express";
import * as schedulesController from "../controllers/schedulesController";
import * as schemaValidatorMiddleware from "../middlewares/schemaValidatorMiddleware";
import { tokenValidator } from "../middlewares/tokenValidatorMiddleware";
import { scheduleSchema } from "../schemas/schedulesSchema";

const schedulesRouter = Router();
const PATH = "/schedules";

schedulesRouter.use(tokenValidator);
schedulesRouter.post(
  `${PATH}/create`,
  schemaValidatorMiddleware.body(scheduleSchema),
  schedulesController.create
);
schedulesRouter.get(
  `${PATH}/findByUserId`,
  schedulesController.findSchedulesByUserId
);
schedulesRouter.delete(`${PATH}/delete/:id`, schedulesController.deleteById);

export default schedulesRouter;
