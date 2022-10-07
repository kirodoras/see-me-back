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

async function deleteById(user_id: number, id: number) {
  const scheduleFind = await findById(id);
  if (scheduleFind.user_id !== user_id) {
    throw {
      type: "unauthorized",
      message: "You don't have permission to delete this schedule",
    };
  }
  const result = await schedulesRepository.deleteById(id);
  return result;
}

async function findById(id: number) {
  const result = await schedulesRepository.findById(id);
  if (!result) {
    throw { type: "not_found", message: "Schedule not found" };
  }
  return result;
}

export { create, findSchedulesByUserId, deleteById };
