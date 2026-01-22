import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

const LOG_DIR = path.join(process.cwd(), "backend", "logs");
try {
  fs.mkdirSync(LOG_DIR, { recursive: true });
} catch (e) {
  // ignore
}

router.post("/client", async (req, res) => {
  const payload = req.body || {};
  // basic size guard
  try {
    const entry = {
      ts: new Date().toISOString(),
      ip: req.ip,
      payload: { ...payload },
    };
    const line = JSON.stringify(entry) + "\n";
    const file = path.join(LOG_DIR, "client.log");
    fs.appendFile(file, line, (err) => {
      if (err) console.error("Failed to write client log", err);
    });
  } catch (e) {
    console.error("Logging error", e);
  }
  res.status(204).end();
});

export default router;
