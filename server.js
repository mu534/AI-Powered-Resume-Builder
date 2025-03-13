import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "https://resumebooster.vercel.app" }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/ai-resume")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  language: { type: String, default: "English" },
});

const User = mongoose.model("User", userSchema);

// Get Language Route (No Authentication needed)
app.get("/api/language", async (req, res) => {
  try {
    // Fetch language from the database or use a default value
    const user = await User.findOne();
    if (!user) {
      return res.json({ language: "English" });
    }
    res.json({ language: user.language });
  } catch (error) {
    console.error("❌ Get Language Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Test Route
app.get("/test", (req, res) => res.send("Server is alive!"));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
