import mongoose from "mongoose";

const pizzaSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },

    prices: {
      small: {
        type: Number,
        required: true,
      },
      medium: {
        type: Number,
        required: true,
      },
      large: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Pizza", pizzaSchema);
