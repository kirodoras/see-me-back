import joi from "joi";
import { TUser } from "../types/usersTypes";

type TEmail = {
  email: string;
};

const loginSchema = joi.object<TUser>({
  email: joi.string().email().required(),
  name: joi.string().required(),
  picture: joi.string().required(),
});

const emailSchema = joi.object<TEmail>({
  email: joi.string().email().required(),
});

export { loginSchema, emailSchema };
