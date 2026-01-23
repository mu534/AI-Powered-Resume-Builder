import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri =
      process.env.MONGO_URI ||
      process.env.MONGODB_URI ||
      // Use 127.0.0.1 to avoid IPv6 (::1) resolution issues on some Windows setups
      "mongodb://127.0.0.1:27017/ai-resume";
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    // During local development we don't want the whole server to exit
    // because of a DB connection issue — allow the server to run so
    // we can debug CORS / API endpoints. In production you may want
    // to exit or implement a retry/backoff here.
    return;
  }
};

export default connectDB;
