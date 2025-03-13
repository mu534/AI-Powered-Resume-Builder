// src/routes/auth.js
import express from "express";
import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Verify Google token and create JWT
router.post("/google", async (req, res, next) => {
  console.log("Received Google token request:", req.body); // Log incoming request
  try {
    const { token } = req.body;

    if (!token) {
      const error = new CustomError("No token provided", 400);
      return res.status(400).json({ error: error.message });
    }

    // Verify the Google token
    console.log("Verifying Google token:", token);
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload || !payload.sub) {
      const error = new CustomError("Invalid Google token", 401);
      return res.status(401).json({ error: error.message });
    }

    // Extract user information from Google payload
    const user = {
      sub: payload.sub,
      email: payload.email || "",
      name: payload.name || "",
      picture: payload.picture || "",
    };

    console.log("Verified user payload:", user);

    // Generate a JWT for the user
    const jwtToken = jwt.sign(
      user,
      process.env.JWT_SECRET || "default-secret",
      { expiresIn: "1h" }
    );

    // Send response with JWT and user data
    res.json({
      token: jwtToken,
      user,
      message: "Successfully authenticated with Google",
    });
  } catch (error) {
    console.error("Google authentication error:", error);
    next(
      error instanceof CustomError ? error : new CustomError(error.message, 500)
    );
  }
});

export default router;
