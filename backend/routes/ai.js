import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const groqKey = process.env.GROQ_API_KEY;
const openaiKey = process.env.OPENAI_API_KEY;

if (!groqKey && !openaiKey) {
  console.warn(
    "No AI API key set (GROQ_API_KEY or OPENAI_API_KEY). AI routes will fail.",
  );
}

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
        message: "AI provider not configured on server.",
      },
    });
  }

  let { prompt } = req.body || {};
  if (typeof prompt !== "string") {
    return res.status(400).json({
      error: { code: "INVALID_INPUT", message: "Invalid or missing prompt." },
    });
  }

  prompt = prompt.trim();
  if (!prompt) {
    return res.status(400).json({
      error: { code: "INVALID_INPUT", message: "Prompt cannot be empty." },
    });
  }

  // Limit prompt size for safety
  if (prompt.length > 5000) {
    return res
      .status(413)
      .json({ error: { code: "TOO_LARGE", message: "Prompt is too long." } });
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
          content:
            "You are a professional resume-writing AI that generates clear, concise, ATS-friendly resumes.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.4,
    });

    const text = completion?.choices?.[0]?.message?.content || "";
    res.json({ text });
  } catch (err) {
    console.error("AI generate error:", err);
    const causeMsg = err?.cause?.message || err?.message;
    res.status(500).json({
      error: {
        code: "AI_ERROR",
        message: causeMsg || "AI generation failed",
      },
    });
  }
});

export default router;
