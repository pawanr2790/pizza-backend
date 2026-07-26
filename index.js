import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import ConnectDB from "./db/Db.js";
import pizzaRoutes from "./routes/PizzaRouter.js";

const app = express();

ConnectDB();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/pizzas", pizzaRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello" });
});

app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
