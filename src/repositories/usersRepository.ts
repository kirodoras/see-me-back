import client from "../database";
import { TUser } from "../types/usersTypes";

async function create(user: TUser) {
  const result = await client.user.create({
    data: user,
  });
  return result;
}

async function find(email: string) {
  const result = await client.user.findUnique({
    where: { email },
  });
  return result;
}

export { create, find };
