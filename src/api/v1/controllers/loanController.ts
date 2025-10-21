import { Request, Response } from "express";

export const createLoan = (req: Request, res: Response) => {
  res.status(201).json({ message: "Loan application created successfully" });
};

export const reviewLoan = (req: Request, res: Response) => {
  res.status(200).json({ message: `Loan application ${req.params.id} reviewed successfully` });
};

export const getLoans = (req: Request, res: Response) => {
  res.status(200).json({ message: "All loan applications retrieved successfully" });
};

export const approveLoan = (req: Request, res: Response) => {
  res.status(200).json({ message: `Loan application ${req.params.id} approved successfully` });
};
