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
    const cart = await Cart.find();

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

    const item = await Cart.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item removed from cart",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
