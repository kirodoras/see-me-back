import app from "../../src/app";
import supertest from "supertest";
import client from "../../src/database";

import { fakerUser, fakerWrongUserEmail } from "../factories/fakerUser";
import { createUser } from "../factories/createUser";

import {
  fakerSchedule,
  fakerWithoutScheduleTittle,
} from "../factories/fakerSchedule";

import oldJwt from "../factories/oldJwt";

beforeEach(async () => {
  await client.$executeRaw`TRUNCATE TABLE "users" RESTART IDENTITY CASCADE;`;
  await client.$executeRaw`TRUNCATE TABLE "schedules" RESTART IDENTITY CASCADE;`;
});

describe("GET /", () => {
  it("should return 200, Online", async () => {
    const result = await supertest(app).get("/");
    const status = result.status;

    expect(status).toEqual(200);
  });
});

describe("POST /users/login", () => {
  it("should return 201, login new user", async () => {
    const body = fakerUser;
    const result = await supertest(app).post("/users/login").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });
  it("should return 422, not login user with wrong email", async () => {
    const body = fakerWrongUserEmail;
    const result = await supertest(app).post("/users/login").send(body);
    const status = result.status;

    expect(status).toEqual(422);
  });
  it("should return 201, login old user", async () => {
    const body = fakerUser;
    await createUser(body);
    const result = await supertest(app).post("/users/login").send(body);
    const status = result.status;

    expect(status).toEqual(201);
  });
});

describe("GET /users/find", () => {
  it("should return 404, user not found", async () => {
    const body = fakerUser;
    const result = await supertest(app)
      .get("/users/find")
      .send({ email: body.email });
    const status = result.status;

    expect(status).toEqual(404);
  });
  it("should return 200, user found", async () => {
    const body = fakerUser;
    await createUser(body);
    const result = await supertest(app)
      .get("/users/find")
      .send({ email: body.email });
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("should return 422, not find user with wrong email", async () => {
    const body = fakerWrongUserEmail;
    await createUser(body);
    const result = await supertest(app)
      .get("/users/find")
      .send({ email: body.email });
    const status = result.status;

    expect(status).toEqual(422);
  });
});

describe("POST /schedules/create", () => {
  it("should return 201, create schedule", async () => {
    const user = await supertest(app).post("/users/login").send(fakerUser);
    const { token } = user.body;
    const result = await supertest(app)
      .post("/schedules/create")
      .send(fakerSchedule)
      .set("authorization", `Bearer ${token}`);
    const status = result.status;

    expect(status).toEqual(201);
  });
  it("should return 422, not create schedule without title", async () => {
    const user = await supertest(app).post("/users/login").send(fakerUser);
    const { token } = user.body;
    const result = await supertest(app)
      .post("/schedules/create")
      .send(fakerWithoutScheduleTittle)
      .set("authorization", `Bearer ${token}`);
    const status = result.status;

    expect(status).toEqual(422);
  });
  it("should return 401, not create schedule without token", async () => {
    const result = await supertest(app)
      .post("/schedules/create")
      .send(fakerSchedule);
    const status = result.status;

    expect(status).toEqual(401);
  });
});

describe("GET /schedules/findByUserId", () => {
  it("should return 200, find schedule", async () => {
    const user = await supertest(app).post("/users/login").send(fakerUser);
    const { token } = user.body;
    const result = await supertest(app)
      .get("/schedules/findByUserId")
      .send(fakerSchedule)
      .set("authorization", `Bearer ${token}`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("should return 401, not find schedule without token", async () => {
    const result = await supertest(app)
      .post("/schedules/findByUserId")
      .send(fakerSchedule);
    const status = result.status;

    expect(status).toEqual(401);
  });
});

describe("DELETE /schedules/delete/:id", () => {
  it("should return 200, delete schedule", async () => {
    const user = await supertest(app).post("/users/login").send(fakerUser);
    const { token } = user.body;
    console.log({ dadasdaddadadasd: token });
    const schedule = await supertest(app)
      .post("/schedules/create")
      .send(fakerSchedule)
      .set("authorization", `Bearer ${token}`);
    const { id } = schedule.body;
    console.log({ dadasdaddadadasd: id });
    const result = await supertest(app)
      .delete(`/schedules/delete/${id}`)
      .send(fakerSchedule)
      .set("authorization", `Bearer ${token}`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("should return 401, error in delete schedule, old jwt token", async () => {
    const token = oldJwt;
    const schedule = await supertest(app)
      .post("/schedules/create")
      .send(fakerSchedule)
      .set("authorization", `Bearer ${token}`);
    const { id } = schedule.body;
    const result = await supertest(app)
      .delete(`/schedules/delete/${id}`)
      .send(fakerSchedule)
      .set("authorization", `Bearer ${token}`);
    const status = result.status;

    expect(status).toEqual(401);
  });
});

describe("GET /token", () => {
  it("should return 200, create token", async () => {
    const name = "name";
    const result = await supertest(app).get(`/token?channelName=${name}`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("should return 200, create token with role publisher", async () => {
    const name = "name";
    const role = "publisher";
    const result = await supertest(app).get(`/token?channelName=${name}?role=${role}`);
    const status = result.status;

    expect(status).toEqual(200);
  });
  it("should return 422, not create token without channel name", async () => {
    const result = await supertest(app).get(`/token`);
    const status = result.status;

    expect(status).toEqual(422);
  });
});

afterAll(async () => {
  await client.$disconnect();
});
