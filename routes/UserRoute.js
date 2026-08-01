import express from "express";
import { login, registration } from "../controllers/UserController.js";
const router = express.Router();

router.post("/signup", registration);
router.post("/login", login);

export default router;
