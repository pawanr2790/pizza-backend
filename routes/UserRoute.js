import express from "express";
import {
  deleteById,
  getProfile,
  login,
  logout,
  registration,
  updateUser,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", registration);
router.post("/login", login);
router.get("/getProfile", authMiddleware, getProfile);
router.post("/logout", logout);
router.delete("/deleteUser", authMiddleware, deleteById);
router.post("/updateUser", authMiddleware, updateUser);

export default router;
