import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri =
    process.env.MONGO_URI ||
    process.env.MONGODB_URI ||
    "mongodb://127.0.0.1:27017/ai-resume";

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1); // Stop the server
  }
};

export default connectDB;
