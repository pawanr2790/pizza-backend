import express from "express";
import {
  addToCart,
  getCart,
  deleteCartItem,
  clearCart,
} from "../controllers/cartController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", authMiddleware, addToCart);

router.get("/getOrder", authMiddleware, getCart);

router.delete("/delete/:id", authMiddleware, deleteCartItem);

router.delete("/clearCart", authMiddleware, clearCart);

export default router;
