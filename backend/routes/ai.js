import express from "express";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const router = express.Router();

const serverKey = process.env.GEMINI_API_KEY;
if (!serverKey) {
  console.warn(
    "GEMINI_API_KEY not set in backend environment. AI routes will fail."
  );
}

const client = serverKey ? new GoogleGenerativeAI(serverKey) : null;

router.post("/generate", async (req, res) => {
  if (!client)
    return res
      .status(500)
      .json({ error: "AI provider not configured on server." });
  const { prompt, model = "gemini-1.5-pro" } = req.body;
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  try {
    const modelClient = client.getGenerativeModel({ model });
    const result = await modelClient.generateContent(prompt);
    const text = result.response?.text?.() ?? "";
    res.json({ text });
  } catch (err) {
    console.error("AI generate error:", err);
    res.status(500).json({ error: "AI generation failed" });
  }
});

export default router;
