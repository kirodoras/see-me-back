import joi from "joi";
import { TSchedule } from "../types/schedulesTypes";

const scheduleSchema = joi.object<TSchedule>({
  title: joi.string().required(),
  hours: joi.string().required(),
});

export { scheduleSchema };
