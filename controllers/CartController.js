import Cart from "../models/Cart.js";
import Pizza from "../models/Pizza.js";

export const addToCart = async (req, res) => {
  try {
    const { pizzaId, size } = req.body;
    // Check if pizza exists
    const pizza = await Pizza.findById(pizzaId);

    if (!pizza) {
      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    // Check if same pizza with same size already exists in cart
    const existingItem = await Cart.findOne({
      user: req.user._id,
      pizza: pizzaId,
      size,
    });

    if (existingItem) {
      existingItem.quantity += 1;
      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
        cart: existingItem,
      });
    }

    // Create new cart item
    const cart = await Cart.create({
      user: req.user._id,
      pizza: pizza._id,
      name: pizza.name,
      image: pizza.image,
      size,
      quantity: 1,
      price: pizza.prices[size],
    });

    res.status(201).json({
      success: true,
      message: "Pizza added to cart",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user._id }).populate({
      path: "pizza",
      populate: {
        path: "restaurant",
        select: "name",
      },
    });
    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedItem = await Cart.findByIdAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found",
      });
    }

    res.status(200).json({
      success: true,
      id: deletedItem._id,
      message: "Item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({ user: req.user._id });

    res.status(200).json({
      success: true,
      message: "Cart cleared successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
