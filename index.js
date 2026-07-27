import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import ConnectDB from "./db/Db.js";
import pizzaRoutes from "./routes/PizzaRouter.js";
import AuthRouter from "./routes/AuthRouter.js";
import CartRouter from "./routes/CartRouter.js";
const app = express();

ConnectDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/auth", AuthRouter);
app.use("/api/cart", CartRouter);
app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
