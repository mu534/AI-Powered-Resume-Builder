import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

const res = await client.chat.completions.create({
  model: "llama-3.1-8b-instant",
  messages: [{ role: "user", content: "Hello from Groq" }],
});

console.log(res.choices[0].message.content);
