import { Request, Response } from "express";
import admin from "../../../../config/firebaseConfig";
import { successResponse, errorResponse } from "../models/responseModel";
import { getErrorMessage, getErrorCode } from "../utils/errorUtils";

/**
 * Creates a new loan application in Firestore.
 * Only stores applicantName, loanAmount, and loanPurpose.
 */
export const createLoan = async (req: Request, res: Response) => {
  try {
    const { applicantName, loanAmount, loanPurpose } = req.body;

    // Validation
    if (!applicantName || !loanAmount || !loanPurpose) {
      return res
        .status(400)
        .json(errorResponse("Missing required fields", "MISSING_FIELDS"));
    }

    const db = admin.firestore();

    const loanData = {
      applicantName,
      loanAmount,
      loanPurpose,
      createdBy: (req as any).user?.email || "unknown",
      createdAt: new Date().toISOString(),
      status: "Pending",
    };

    // Add document to Firestore
    const docRef = await db.collection("loans").add(loanData);

    res
      .status(201)
      .json(successResponse({ id: docRef.id, ...loanData }, "Loan application created successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(getErrorMessage(error), getErrorCode(error)));
  }
};

/**
 * Marks a loan as reviewed by an officer.
 */
export const reviewLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = admin.firestore();

    await db.collection("loans").doc(id).update({
      status: "Reviewed",
      reviewedAt: new Date().toISOString(),
    });

    res.status(200).json(successResponse({ id }, `Loan application ${id} reviewed successfully`));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(getErrorMessage(error), getErrorCode(error)));
  }
};

/**
 * Retrieves all loan applications from Firestore.
 */
export const getLoans = async (req: Request, res: Response) => {
  try {
    const db = admin.firestore();
    const snapshot = await db.collection("loans").get();

    const loans = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(successResponse(loans, "All loan applications retrieved successfully"));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(getErrorMessage(error), getErrorCode(error)));
  }
};

/**
 * Marks a loan as approved by a manager.
 */
export const approveLoan = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const db = admin.firestore();

    await db.collection("loans").doc(id).update({
      status: "Approved",
      approvedAt: new Date().toISOString(),
    });

    res.status(200).json(successResponse({ id }, `Loan application ${id} approved successfully`));
  } catch (error) {
    res
      .status(500)
      .json(errorResponse(getErrorMessage(error), getErrorCode(error)));
  }
};
