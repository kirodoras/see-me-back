import * as schedulesRepository from "../repositories/schedulesRepository";
import { TSchedule } from "../types/schedulesTypes";

async function create(schedule: TSchedule) {
  const result = await schedulesRepository.create(schedule);
  return result;
}

async function findSchedulesByUserId(user_id: number) {
  const result = await schedulesRepository.findSchedulesByUserId(user_id);
  return result;
}

export { create, findSchedulesByUserId };
