import { Request, Response } from "express";
import admin from "../../../../config/firebaseConfig";
import { successResponse, errorResponse } from "../models/responseModel";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

/**
 * Assigns a custom role to a Firebase user.
 * Example: { "uid": "USER_UID", "role": "officer" }
 */
export const setUserRole = async (req: Request, res: Response) => {
  try {
    const { uid, role } = req.body;

    if (!uid || !role) {
      return res.status(400).json(errorResponse("Missing UID or role", "MISSING_FIELDS"));
    }

    await admin.auth().setCustomUserClaims(uid, { role });
    res.status(200).json(successResponse(null, `Role '${role}' assigned successfully`));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(getErrorMessage(error), getErrorCode(error)));
  }
};
