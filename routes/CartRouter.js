import express from "express";
import {
  addToCart,
  getCart,
  deleteCartItem,
  clearCart,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/getOrder", getCart);
router.delete("/delete/:id", deleteCartItem);
router.delete("/clearCart", clearCart);

export default router;
