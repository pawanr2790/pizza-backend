import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import ConnectDB from "./db/Db.js";
import pizzaRoutes from "./routes/PizzaRouter.js";
import CartRouter from "./routes/CartRouter.js";
import UserRouter from "./routes/UserRoute.js";
import cookieParser from "cookie-parser";
const app = express();

ConnectDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/cart", CartRouter);
app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
