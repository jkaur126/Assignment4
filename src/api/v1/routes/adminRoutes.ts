import { Router } from "express";
import { setUserRole } from "../controllers/adminController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/authorizeMiddleware";

const router = Router();

router.post("/set-role", authenticate, authorize(["admin"]), setUserRole);

export default router;
