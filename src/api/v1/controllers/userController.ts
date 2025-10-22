import { Request, Response } from "express";
import admin from "../../../../config/firebaseConfig";
import { successResponse, errorResponse } from "../models/responseModel";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

/**
 * Retrieves details of a Firebase user by UID.
 */
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const userRecord = await admin.auth().getUser(uid);
    res.status(200).json(successResponse(userRecord, "User retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(getErrorMessage(error), getErrorCode(error)));
  }
};
