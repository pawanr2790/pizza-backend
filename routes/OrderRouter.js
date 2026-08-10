import express from "express";
import {
  placeOrder,
  getMyOrders,
  getOrderById,
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

router.get("/:id", authMiddleware, getOrderById);

router.patch("/:id/cancel", authMiddleware, cancelOrder);

// Restaurant orders
router.get("/restaurant", authMiddleware, getOrdersByRestaurant);

// Admin routes
router.get("/all", authMiddleware, getAllOrders);

router.patch("/:id/status", authMiddleware, updateOrderStatus);

router.delete("/:id", authMiddleware, deleteOrder);

export default router;
