/* eslint-disable @typescript-eslint/no-explicit-any */
import * as usersService from "../../src/services/usersService";
import * as usersRepository from "../../src/repositories/usersRepository";
import { fakerUser } from "../factories/fakerUser";
import * as schedulesService from "../../src/services/schedulesService";
import * as schedulesRepository from "../../src/repositories/schedulesRepository";
import { fakerSchedule } from "../factories/fakerSchedule";

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

describe("Schedule Service - create function", () => {
  it("should pass to create schedule", async () => {
    const schedule = fakerSchedule;
    jest
      .spyOn(schedulesRepository, "create")
      .mockImplementationOnce((): any => {
        return true;
      });
    await schedulesService.create({ ...schedule, user_id: 9999 });
    expect(schedulesRepository.create).toBeCalled();
  });
});

describe("Schedule Service - findSchedulesByUserId function", () => {
  it("should pass to find schedules by user id", async () => {
    const user_id = 9999;
    jest
      .spyOn(schedulesRepository, "findSchedulesByUserId")
      .mockImplementationOnce((): any => {
        return true;
      });
    await schedulesService.findSchedulesByUserId(user_id);
    expect(schedulesRepository.findSchedulesByUserId).toBeCalled();
  });
});

describe("Schedule Service - deleteById function", () => {
  it("should pass to delete schedule by id", async () => {
    const id = 99;
    const user_id = 9999;
    jest
      .spyOn(schedulesRepository, "findById")
      .mockImplementationOnce((): any => {
        return { id, user_id, ...fakerSchedule };
      });
    jest
      .spyOn(schedulesRepository, "deleteById")
      .mockImplementationOnce((): any => {
        return true;
      });
    await schedulesService.deleteById(user_id, id);
    expect(schedulesRepository.deleteById).toBeCalled();
  });
  it("should pass to not delete schedule - unauthorized", async () => {
    const id = 99;
    const user_id = 9999;
    const user_id2 = 9998;
    jest
      .spyOn(schedulesRepository, "findById")
      .mockImplementationOnce((): any => {
        return { id, user_id: user_id2, ...fakerSchedule };
      });
    jest
      .spyOn(schedulesRepository, "deleteById")
      .mockImplementationOnce((): any => {
        return true;
      });
    try {
      await schedulesService.deleteById(user_id, id);
    } catch (err) {
      expect(err).toEqual({
        type: "unauthorized",
        message: "You don't have permission to delete this schedule",
      });
    }
  });
  it("should pass to not delete schedule - unauthorized", async () => {
    const id = 99;
    const user_id = 9999;
    jest
      .spyOn(schedulesRepository, "findById")
      .mockImplementationOnce((): any => {
        return false;
      });
    jest
      .spyOn(schedulesRepository, "deleteById")
      .mockImplementationOnce((): any => {
        return true;
      });
    try {
      await schedulesService.deleteById(user_id, id);
    } catch (err) {
      expect(err).toEqual({
        type: "not_found",
        message: "Schedule not found",
      });
    }
  });
});
