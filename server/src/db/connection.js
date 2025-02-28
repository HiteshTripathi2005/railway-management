import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb://127.0.0.1:27017/railway_booking"
    );

    console.log("MongoDB Connected");
    return conn;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
};
