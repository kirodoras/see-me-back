import client from "../database";
import { TSchedule } from "../types/schedulesTypes";

async function create(schedule: TSchedule) {
  const result = await client.schedule.create({
    data: schedule,
  });
  return result;
}

async function findSchedulesByUserId(user_id: number) {
  const result = await client.schedule.findMany({
    where: {
      user_id,
    },
  });
  return result;
}

async function findById(id: number) {
  const result = await client.schedule.findUnique({
    where: {
      id,
    },
  });
  return result;
}

async function deleteById(id: number) {
  const result = await client.schedule.delete({
    where: {
      id,
    },
  });
  return result;
}

export { create, findSchedulesByUserId, findById, deleteById };
