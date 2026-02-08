import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const groqKey = process.env.GROQ_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

const apiKey = groqKey || openaiKey || null;

const client = apiKey
  ? new OpenAI({
      apiKey,
      ...(groqKey ? { baseURL: "https://api.groq.com/openai/v1" } : {}),
    })
  : null;

router.post("/generate", async (req, res) => {
  if (!client) {
    return res.status(503).json({
      error: {
        code: "AI_NOT_CONFIGURED",
        message: "AI provider not configured.",
      },
    });
  }

  let { prompt } = req.body;

  if (typeof prompt !== "string" || !prompt.trim()) {
    return res.status(400).json({
      error: { code: "INVALID_INPUT", message: "Prompt cannot be empty." },
    });
  }

  try {
    const model =
      process.env.AI_MODEL ||
      (groqKey ? "llama-3.1-8b-instant" : "gpt-4o-mini");

    const completion = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: "You are a professional resume-writing AI.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 300,
    });

    let text = completion?.choices?.[0]?.message?.content || "";

    // Clean up and truncate
    text = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    const words = text.split(" ");
    if (words.length > 50) text = words.slice(0, 50).join(" ") + "...";

    res.json({ text });
  } catch (err) {
    console.error("AI generate error:", err);
    const causeMsg = err?.cause?.message || err?.message;
    res.status(500).json({
      error: { code: "AI_ERROR", message: causeMsg || "AI generation failed" },
    });
  }
});

export default router;
