import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Middleware to authorize users based on roles.
 * @param allowedRoles - array of roles allowed to access the route
 */
export const authorize =
  (allowedRoles: string[]) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as any).user;

    if (!user || !user.role) {
      res.status(HTTP_STATUS.FORBIDDEN).json({
        status: "error",
        message: "User role not found or unauthorized",
      });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AuthorizationError(
        `Access denied for role: ${user.role}. Required: ${allowedRoles.join(", ")}`
      );
    }

    next();
  };
