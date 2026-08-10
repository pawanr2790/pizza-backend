import { errorHandler, successHandler } from "../utils/responseHandler.js";
import Cart from "../models/Cart.js";
import Pizza from "../models/Pizza.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

export const placeOrder = async (req, res) => {
  try {
    const { address, phone } = req.body;
    const cart = await Cart.find({ user: req.user.id });
    if (!cart.length) return errorHandler(res, 500, "cart is empty");

    const cartPizzaInfo = cart.map((pizzaInfo) => {
      return {
        pizza: pizzaInfo.pizza,
        size: pizzaInfo.size,
        quantity: pizzaInfo.quantity,
        price: pizzaInfo.price,
      };
    });

    const cartPizzaInfoWithRestaurant = await Promise.all(
      cartPizzaInfo.map(async (cartItem) => {
        const pizzaFullInfo = await Pizza.findById(cartItem.pizza);

        return {
          ...cartItem,
          restaurant: pizzaFullInfo.restaurant,
        };
      }),
    );

    const restaurant = {};

    cartPizzaInfoWithRestaurant.forEach((item) => {
      const restaurantId = item.restaurant.toString();
      if (!restaurant[restaurantId]) {
        restaurant[restaurantId] = [];
      }
      restaurant[restaurantId].push({
        pizza: item.pizza,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      });
    });

    let grandTotal = 0;

    for (const restaurantId in restaurant) {
      const items = restaurant[restaurantId];

      const totalAmount = items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
      grandTotal += totalAmount;

      await Order.create({
        user: req.user.id,
        restaurant: restaurantId,
        items,
        address,
        phone,
        totalAmount,
        status: "pending",
      });
    }

    return successHandler(res, 200, "order successfully created");
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

export const getOrdersByRestaurant = async (req, res) => {
  try {
    const orders = await Order.find({
      restaurant: req.user.id,
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

export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return errorHandler(res, 404, "Order not found");
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    console.log(error);
    errorHandler(res, 500, error.message);
  }
};
