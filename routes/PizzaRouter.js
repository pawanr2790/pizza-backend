import express from "express";
import { createPizza } from "../controllers/PizzaController.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), createPizza);

export default router;
