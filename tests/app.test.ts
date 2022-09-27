import app from "../src/app";
import supertest from "supertest";

beforeEach(async () => {
  // essa função será executada antes de cada it() rodar
  //await prisma.$executeRaw`TRUNCATE TABLE [TABLE_NAME]`;
});

describe("GET /", () => {
  it("should return 200, Online", async () => {
    const result = await supertest(app).get("/");
    const status = result.status;

    expect(status).toEqual(200);
  });
});

afterAll(async () => {
  // essa função será executada ao final de todos os testes
  //await prisma.$disconnect();
});
