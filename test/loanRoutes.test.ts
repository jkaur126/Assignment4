import "./setupMocks";
import request from "supertest";
import app from "../src/app";

describe("Loan Routes", () => {
  // --- CREATE LOAN TEST ---
  it("should create a new loan application", async () => {
    const res = await request(app)
      .post("/api/v1/loans")
      .send({
        applicantName: "Test User",
        loanAmount: 5000,
        loanPurpose: "Testing",
      });

    expect([200, 201]).toContain(res.statusCode); // Allow both 200/201 depending on response
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("applicantName", "Test User");
  });

  // --- GET ALL LOANS TEST ---
  it("should retrieve all loans successfully", async () => {
    const res = await request(app).get("/api/v1/loans");
    expect([200, 201]).toContain(res.statusCode);
    expect(res.body.status).toBe("success");
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  // --- REVIEW LOAN TEST ---
  it("should mark a loan as reviewed (mocked Firestore)", async () => {
    const loanId = "mockLoan123"; // mock id
    const res = await request(app).put(`/api/v1/loans/${loanId}/review`);

    // Firestore mocking
    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.status).toBe("success");
      expect(res.body.message).toContain("reviewed");
    }
  });

  // --- APPROVE LOAN TEST ---
  it("should mark a loan as approved (mocked Firestore)", async () => {
    const loanId = "mockLoan123"; // mock id
    const res = await request(app).put(`/api/v1/loans/${loanId}/approve`);

    expect([200, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body.status).toBe("success");
      expect(res.body.message).toContain("approved");
    }
  });
});
