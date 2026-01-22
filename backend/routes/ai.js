import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const groqKey = process.env.GROQ_API_KEY;

if (!groqKey) {
  console.warn("GROQ_API_KEY not set. AI routes will fail.");
}

const client = groqKey
  ? new OpenAI({
      apiKey: groqKey,
      baseURL: "https://api.groq.com/openai/v1",
    })
  : null;

router.post("/generate", async (req, res) => {
  if (!client) {
    return res.status(500).json({
      error: "AI provider not configured on server.",
    });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Missing prompt" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a professional resume-writing AI that generates clear, concise, ATS-friendly resumes.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    res.json({
      text: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI generate error:", err);
    res.status(500).json({
      error: err?.message || "AI generation failed",
    });
  }
});

export default router;
