import app from "../../src/app";
import supertest from "supertest";
import client from "../../src/database";

import { fakerUser } from "../factories/fakerUser";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
});

describe("GET /", () => {
  it("should return 200, Online", async () => {
    const result = await supertest(app).get("/");
    const status = result.status;

    expect(status).toEqual(200);
  });
});

describe("POST /users/login", () => {
  it("should return 200, Online", async () => {
    const body = fakerUser;
    const result = await supertest(app).post("/users/login").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });
});

afterAll(async () => {
  await client.$disconnect();
});
