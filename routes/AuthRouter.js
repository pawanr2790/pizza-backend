import express from "express";
import { login, logout } from "../controllers/AuthController.js";

const router = express.Router();

router.get("/login", login);
router.post("/logout", logout);

export default router;
