import client from "../../src/database";
import { TUser } from "../../src/types/usersTypes";

async function createUser(user: TUser) {
  const result = await client.user.create({
    data: user,
  });
  return result;
}

export { createUser };
