import { Router } from "express";
import { getUserById } from "../controllers/userController";

const router = Router();

// GET user details by UID
router.get("/:uid", getUserById);

export default router;