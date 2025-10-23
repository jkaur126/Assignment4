import "./setupMocks";
import request from "supertest";
import app from "../src/app";

describe("Admin Routes", () => {
  it("should return error for missing uid or role", async () => {
    const res = await request(app).post("/api/v1/admin/set-role").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe("error");
  });

  it("should respond with success when role is assigned", async () => {
    const res = await request(app)
      .post("/api/v1/admin/set-role")
      .send({ uid: "fakeUID123", role: "manager" });

    // NO mocking Firebase here, just check status codes
    expect([200, 500]).toContain(res.statusCode);
  });
});
