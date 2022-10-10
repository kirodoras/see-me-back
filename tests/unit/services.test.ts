/* eslint-disable @typescript-eslint/no-explicit-any */
import * as usersService from "../../src/services/usersService";
import * as usersRepository from "../../src/repositories/usersRepository";
import { fakerUser, fakerWrongUserEmail } from "../factories/fakerUser";
import { createUser } from "../factories/createUser";

beforeEach(() => {
  jest.clearAllMocks();
  jest.resetAllMocks();
});

describe("User Service - create function", () => {
  it("should pass to create new user", async () => {
    const user = fakerUser;
    jest.spyOn(usersRepository, "find").mockImplementationOnce((): any => {
      return false;
    });
    jest.spyOn(usersRepository, "create").mockImplementationOnce((): any => {
      user;
    });
    await usersService.create(user);
    expect(usersRepository.create).toBeCalled();
  });
  it("should pass to find user", async () => {
    const user = fakerUser;
    jest.spyOn(usersRepository, "find").mockImplementationOnce((): any => {
      return true;
    });
    jest.spyOn(usersRepository, "create").mockImplementationOnce((): any => {
      user;
    });
    await usersService.create(user);
    expect(usersRepository.find).toBeCalled();
  });
});

describe("User Service - find function", () => {
  it("should pass to not found user", async () => {
    const user = fakerUser;
    const { email } = user;
    jest.spyOn(usersRepository, "find").mockImplementationOnce((): any => {
      return false;
    });
    try {
      await usersService.find(email);
    } catch (err) {
      expect(err).toEqual({ type: "not_found", message: "User not found" });
    }
  });
  it("should pass to find user", async () => {
    const user = fakerUser;
    const { email } = user;
    jest.spyOn(usersRepository, "find").mockImplementationOnce((): any => {
      return true;
    });
    await usersService.find(email);
    expect(usersRepository.find).toBeCalled();
  });
});
