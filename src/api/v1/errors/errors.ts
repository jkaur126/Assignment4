import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Base class for application errors.
 * Keeps message, code, and HTTP status in one consistent structure.
 */
export class AppError extends Error {
  constructor(
    public message: string,
    public code: string,
    public statusCode: number
  ) {
    super(message);
    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}

/** 
 * Thrown when authentication fails.
 */
export class AuthenticationError extends AppError {
  constructor(
    message: string,
    code: string = "AUTHENTICATION_ERROR",
    statusCode: number = HTTP_STATUS.UNAUTHORIZED
  ) {
    super(message, code, statusCode);
  }
}

/**
 * Thrown when user has insufficient permissions.
 */
export class AuthorizationError extends AppError {
  constructor(
    message: string,
    code: string = "AUTHORIZATION_ERROR",
    statusCode: number = HTTP_STATUS.FORBIDDEN
  ) {
    super(message, code, statusCode);
  }
}