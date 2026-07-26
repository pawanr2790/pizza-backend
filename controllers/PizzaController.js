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
    });

    res.status(201).json(pizza);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
