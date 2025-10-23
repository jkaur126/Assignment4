import { Router } from "express";
import { createLoan, reviewLoan, getLoans, approveLoan } from "../controllers/loanController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorizeMiddleware";

const router = Router();

router.post("/", authenticate, authorize(["user"]), createLoan);
router.put("/:id/review", authenticate, authorize(["officer"]), reviewLoan);
router.get("/", authenticate, authorize(["officer", "manager"]), getLoans);
router.put("/:id/approve", authenticate, authorize(["manager"]), approveLoan);

export default router;
