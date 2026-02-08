import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";

// Ensure we load the .env file located in the backend folder regardless of cwd.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);
app.options("*", cors());

// initialize DB
connectDB();

// Simple User model (for demo purposes)
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  language: { type: String, default: "English" },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

app.get("/api/language", async (req, res) => {
  try {
    const user = await User.findOne();
    if (!user) return res.json({ language: "English" });
    res.json({ language: user.language });
  } catch (err) {
    console.error("Get language error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/language", async (req, res) => {
  try {
    const { language } = req.body;
    const user = await User.findOneAndUpdate(
      {},
      { language },
      { new: true, upsert: true },
    );
    res.json({ language: user.language });
  } catch (err) {
    console.error("Update language error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "All fields are required." });
  try {
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ error: "Email already in use." });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    res.status(201).json({ message: "User created" });
  } catch (err) {
    console.error("Sign up error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Email and password required." });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials." });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials." });
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" },
    );
    res.json({ token });
  } catch (err) {
    console.error("Sign in error", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/test", (req, res) => res.send("Server is alive!"));

// Mount AI routes after environment is loaded
const aiModule = await import("./routes/ai.js");
app.use("/api/ai", aiModule.default);

// Client-side logs endpoint (best-effort)
try {
  const logs = await import("./routes/logs.js");
  app.use("/api/logs", logs.default);
} catch (e) {
  console.warn("Logs route not available:", e?.message || e);
}

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Backend running on port ${PORT}`),
);

server.on("error", (err) => {
  if (err && err.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Kill the process using the port or set a different PORT environment variable and restart.`,
    );
    process.exit(1);
  }
  console.error("Server error:", err);
  process.exit(1);
});
