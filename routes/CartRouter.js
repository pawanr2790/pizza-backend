import express from "express";
import {
  addToCart,
  getCart,
  deleteCartItem,
} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/getOrder", getCart);
router.delete("/:id", deleteCartItem);

export default router;
