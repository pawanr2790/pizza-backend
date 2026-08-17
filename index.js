import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import ConnectDB from "./db/Db.js";
import pizzaRoutes from "./routes/PizzaRouter.js";
import CartRouter from "./routes/CartRouter.js";
import UserRouter from "./routes/UserRoute.js";
import OrderRouter from "./routes/OrderRouter.js";
import cookieParser from "cookie-parser";
import passport from "./utils/passport.js";
const app = express();

ConnectDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(passport.initialize());
// Routes
app.use("/api/pizzas", pizzaRoutes);
app.use("/api/cart", CartRouter);
app.use("/api/user", UserRouter);
app.use("/api/order", OrderRouter);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
