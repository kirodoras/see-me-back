import { Schedule } from "@prisma/client";

type TSchedule = Omit<Schedule, "id">;

export { Schedule, TSchedule };
