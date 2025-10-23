import { Request, Response, NextFunction } from "express";
import { authorize } from "../src/api/v1/middleware/authorizeMiddleware";

describe("Authorization Middleware", () => {
  it("should deny access for missing user role", () => {
    const req = { user: { role: undefined } } as any as Request;
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() } as any;
    const next = jest.fn() as NextFunction;

    const middleware = authorize(["manager"]);
    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalled();
  });

  it("should call next() for valid role", () => {
    const req = { user: { role: "manager" } } as any;
    const res = {} as Response;
    const next = jest.fn() as NextFunction;

    const middleware = authorize(["manager"]);
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
