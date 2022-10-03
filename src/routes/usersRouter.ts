import { Router } from "express";
import * as usersController from "../controllers/usersController";
import * as schemaValidatorMiddleware from "../middlewares/schemaValidatorMiddleware";
import { loginSchema, emailSchema } from "../schemas/usersSchema";

const usersRouter = Router();
const PATH = "/users";

usersRouter.post(
  `${PATH}/login`,
  schemaValidatorMiddleware.body(loginSchema),
  usersController.create
);
usersRouter.get(
  `${PATH}/find`,
  schemaValidatorMiddleware.body(emailSchema),
  usersController.find
);

export default usersRouter;
