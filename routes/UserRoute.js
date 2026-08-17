import express from "express";
import {
  deleteById,
  getProfile,
  googleCallback,
  login,
  logout,
  registration,
  updateUser,
} from "../controllers/UserController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import passport from "../utils/passport.js";
const router = express.Router();

router.post("/signup", registration);
router.post("/login", login);
router.get("/getProfile", authMiddleware, getProfile);
router.post("/logout", logout);
router.delete("/deleteUser", authMiddleware, deleteById);
router.put("/updateUser", authMiddleware, updateUser);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  googleCallback,
);
export default router;
