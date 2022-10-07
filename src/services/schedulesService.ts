import * as schedulesRepository from "../repositories/schedulesRepository";
import { TSchedule } from "../types/schedulesTypes";

async function create(schedule: TSchedule) {
  const result = await schedulesRepository.create(schedule);
  return result;
}

export { create };
