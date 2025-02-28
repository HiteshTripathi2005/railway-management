import app from "./app.js";
import { connectDB } from "./db/connection.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("Connected to MongoDB");
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  });
