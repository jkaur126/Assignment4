import { Request, Response, NextFunction } from "express";
import admin from "../../../../config/firebaseConfig";
import { AuthenticationError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Middleware to authenticate Firebase users using ID tokens.
 * Verifies the token and attaches user info (uid, email, role) to req.user.
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AuthenticationError("Missing or invalid Authorization header");
    }

    const idToken = authHeader.split(" ")[1];
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach user info to request object
    (req as any).user = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role || decodedToken.claims?.role, // role comes from custom claim
    };

    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(HTTP_STATUS.UNAUTHORIZED).json({
      status: "error",
      message: "Authentication failed",
      details: (error as Error).message,
    });
  }
};
