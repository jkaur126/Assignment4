import { Router } from "express";
import { setUserRole } from "../controllers/adminController";

const router = Router();

// POST to assign custom role
router.post("/set-role", setUserRole);

export default router;
