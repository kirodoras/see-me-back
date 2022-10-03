import * as usersRepository from "../repositories/usersRepository";
import * as jwtProvider from "../providers/jwtProvider";
import { TUser } from "../types/usersTypes";

async function create(user: TUser) {
  const { email } = user;
  const token = jwtProvider.encode({ email });
  const findUser = await usersRepository.find(email);
  if (findUser) {
    return { ...findUser, token };
  }
  const result = await usersRepository.create(user);
  return { ...result, token };
}

async function find(email: string) {
  const result = await usersRepository.find(email);
  if (!result) {
    throw { type: "not_found", message: "User not found" };
  }
  const token = jwtProvider.encode({ email });
  return { ...result, token };
}

export { create, find };
