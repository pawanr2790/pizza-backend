import Pizza from "../models/Pizza.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs/promises";

export const createPizza = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path);

    // Delete local file after cloudinary upload completes
    await fs.unlink(req.file.path);

    const pizza = await Pizza.create({
      name: req.body.name,
      prices: JSON.parse(req.body.prices),
      image: result.secure_url,
      restaurant: req.user.id,
    });

    res.status(201).json(pizza);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPizzas = async (req, res) => {
  try {
    const pizzas = await Pizza.find().populate("restaurant", "name");

    res.status(200).json({
      success: true,
      count: pizzas.length,
      pizzas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pizzas",
      error: error.message,
    });
  }
};

export const getPizzasByrestaurant = async (req, res) => {
  try {
    const pizzas = await Pizza.find({ restaurant: req.user.id });
    res.status(200).json({
      success: true,
      count: pizzas.length,
      pizzas,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch pizzas",
      error: error.message,
    });
  }
};

export const updatePizzaImage = async (req, res) => {
  try {
    const { id } = req.params;

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image is required",
      });
    }

    const pizza = await Pizza.findById(id);

    if (!pizza) {
      await fs.unlink(req.file.path);

      return res.status(404).json({
        success: false,
        message: "Pizza not found",
      });
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "pizza-app",
    });

    // Delete local file
    await fs.unlink(req.file.path);

    // Update image URL
    pizza.image = result.secure_url;
    await pizza.save();

    res.status(200).json({
      success: true,
      message: "Pizza image updated successfully",
      pizza,
    });
  } catch (error) {
    if (req.file) {
      try {
        await fs.unlink(req.file.path);
      } catch {}
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
