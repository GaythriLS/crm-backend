const request = require("supertest");
const app = require("../server");

describe("Auth API", () => {
  it("GET / - should return API status", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain("CRM Backend API is running");
  });

  it("POST /api/auth/login - should fail with missing credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({});
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  it("POST /api/auth/login - should fail with wrong credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nobody@test.com", password: "wrongpassword" });
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/auth/me - should fail without token", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it("GET /api/customers - should fail without token", async () => {
    const res = await request(app).get("/api/customers");
    expect(res.statusCode).toBe(401);
  });

  it("GET /nonexistent - should return 404", async () => {
    const res = await request(app).get("/api/nonexistent");
    expect(res.statusCode).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
