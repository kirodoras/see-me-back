import client from "../database";
import { TSchedule } from "../types/schedulesTypes";

async function create(schedule: TSchedule) {
  const result = await client.schedule.create({
    data: schedule,
  });
  return result;
}

export { create };
