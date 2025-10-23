import { Request, NextFunction } from "express";
import { authenticate } from "../src/api/v1/middleware/authMiddleware";

describe("Authentication Middleware", () => {
  it("should return 401 if Authorization header is missing", async () => {
    const req = { headers: {} } as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn() as NextFunction;

    await authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalled();
  });
});
