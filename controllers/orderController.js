import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Cart from "../models/Cart.js";
import Pizza from "../models/Pizza.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { address, phone, status } = req.body;
    const cart = await Cart.find({ user: req.user.id });
    if (!cart) return errorHandler(res, 400, "cart is not valid");

    const orderItems = await Promise.all(
      cart.map(async (item, index) => {
        const pizza = await Pizza.findById(item.pizza);
        return {
          pizza: pizza._id,
          seller: pizza.seller || pizza._id,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    );

    const totalAmount = orderItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    const order = await Order.create({
      user: req.user.id,
      items: orderItems,
      address,
      phone,
      totalAmount,
      status,
    });

    return successHandler(res, 200, "order successfully created", order);
  } catch (error) {
    console.log(error);
    return errorHandler(res, 500, error.message);
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};

// Get single order by id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return errorHandler(res, 404, "Order not found");
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};

// Admin get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};

// Admin update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorHandler(res, 404, "Order not found");
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return errorHandler(res, 404, "Order not found");
    }

    order.status = "cancelled";

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};
