import { faker } from "@faker-js/faker";
import { TSchedule } from "../../src/types/schedulesTypes";

type TScheduleFaker = Omit<TSchedule, "user_id">;
type TScheduleFakerWithoutTitle = Omit<TScheduleFaker, "title">;

const fakerSchedule: TScheduleFaker = {
  title: faker.lorem.words(1),
  hours: faker.lorem.words(1),
};

const fakerWithoutScheduleTittle: TScheduleFakerWithoutTitle = {
  hours: faker.lorem.words(1),
};

export { fakerSchedule, fakerWithoutScheduleTittle };
