import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default ConnectDB;