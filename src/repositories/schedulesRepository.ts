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

export { create, findSchedulesByUserId };
