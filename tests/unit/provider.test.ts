import * as jwtProvider from "../../src/providers/jwtProvider";
import { fakerUser } from "../factories/fakerUser";
import oldJwt from "../factories/oldJwt";
describe("JWT Provider - encode function", () => {
  it("should pass to encode email", async () => {
    const user = fakerUser;
    const { email } = user;
    const token = jwtProvider.encode({ email });
    expect(token).toBeTruthy();
  });
});

describe("JWT Provider - decode function", () => {
  it("should pass to decode email", async () => {
    const user = fakerUser;
    const { email } = user;
    const token = jwtProvider.encode({ email });
    const decoded = jwtProvider.decode(token);
    expect(decoded).toBeTruthy();
  });
  it("should pass to unauthorized decode email - token expired", async () => {
    const token = oldJwt;
    try {
      jwtProvider.decode(token);
    } catch (err) {
      expect(err).toEqual({ type: "unauthorized", message: "Token expired" });
    }
  });
});
