import express from "express";
import {
  createPizza,
  getPizzas,
  updatePizzaImage,
} from "../controllers/PizzaController.js";
import { upload } from "../middleware/multer.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", upload.single("image"), authMiddleware, createPizza);
router.get("/getAllPizza", getPizzas);
router.put("/update-image/:id", upload.single("image"), updatePizzaImage);
export default router;
