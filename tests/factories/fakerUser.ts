import { faker } from "@faker-js/faker";
import { TUser } from "../../src/types/usersTypes";

const fakerUser: TUser = {
  email: faker.internet.email(),
  name: faker.name.firstName(),
  picture: faker.internet.url(),
};

const fakerWrongUserEmail: TUser = {
  email: faker.name.firstName(),
  name: faker.name.firstName(),
  picture: faker.internet.url(),
};

export { fakerUser, fakerWrongUserEmail };
