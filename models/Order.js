import mongoose from "mongoose";
import User from "./User.js";
import Pizza from "./Pizza.js";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    restaurant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        pizza: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Pizza",
          required: true,
        },

        size: {
          type: String,
          enum: ["small", "medium", "large"],
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
        },
      },
    ],

    address: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Order", orderSchema);
