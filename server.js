import express from "express";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://resumebooster.vercel.app",
      "https://resumebooster.onrender.com",
    ],
    credentials: true,
  })
);

const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/ai-resume";
console.log("MONGO_URI:", mongoUri);

mongoose
  .connect(mongoUri)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    // Continue running server even if MongoDB fails
  });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  language: { type: String, default: "English" },
});
const User = mongoose.model("User", userSchema);

app.use(
  express.static(path.join(__dirname, "dist"), { index: false }),
  (req, res, next) => {
    console.log(`Static request for: ${req.url}`);
    next();
  }
);

app.get("/api/language", async (req, res) => {
  /* ... */
});
app.post("/signup", async (req, res) => {
  /* ... */
});
app.post("/signin", async (req, res) => {
  /* ... */
});
app.get("/test", (req, res) => res.send("Server is alive!"));

app.get("*", (req, res) => {
  const filePath = path.join(__dirname, "dist", "index.html");
  console.log(`Attempting to serve: ${filePath}`);
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Failed to serve ${filePath}:`, err);
      res.status(404).send("File not found");
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
