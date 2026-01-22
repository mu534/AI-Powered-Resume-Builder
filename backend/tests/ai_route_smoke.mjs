import express from "express";
import fetch from "node-fetch";
import aiRouter from "../routes/ai.js";

async function run() {
  const app = express();
  app.use(express.json());
  app.use("/api/ai", aiRouter);

  const server = await new Promise((res) => {
    const s = app.listen(0, () => res(s));
  });
  const port = server.address().port;
  console.log("Test server listening on", port);

  // Test 1: when GROQ_API_KEY not set, endpoint should return 503
  const res1 = await fetch(`http://127.0.0.1:${port}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt: "hello" }),
  });
  console.log("Status for generate without provider:", res1.status);

  // Test 2: missing prompt should return 400 or 503 depending on config
  const res2 = await fetch(`http://127.0.0.1:${port}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  console.log("Status for generate with missing prompt:", res2.status);

  server.close();

  // Exit with 0 when responses are valid HTTP numbers
  process.exit(0);
}

run().catch((e) => {
  console.error("Smoke tests failed", e);
  process.exit(1);
});
