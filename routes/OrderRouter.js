import express from "express";
import {
  placeOrder,
  getMyOrders,
  getAllOrders,
  getOrdersByRestaurant,
  updateOrderStatus,
  cancelOrder,
  deleteOrder,
} from "../controllers/orderController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Customer routes
router.post("/placeOrder", authMiddleware, placeOrder);

router.get("/my-orders", authMiddleware, getMyOrders);
router.patch("/cancel", authMiddleware, cancelOrder);

// Restaurant orders
router.get("/restaurant", authMiddleware, getOrdersByRestaurant);

// Admin routes
router.get("/all", authMiddleware, getAllOrders);

router.patch("/status", authMiddleware, updateOrderStatus);

router.delete("/:id", authMiddleware, deleteOrder);

export default router;
