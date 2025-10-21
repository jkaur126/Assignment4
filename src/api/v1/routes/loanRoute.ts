import { Router } from "express";
import { createLoan, reviewLoan, getLoans, approveLoan } from "../controllers/loanController";

const router = Router();

router.post("/loans", createLoan);
router.put("/loans/:id/review", reviewLoan);
router.get("/loans", getLoans);
router.put("/loans/:id/approve", approveLoan);

export default router;
