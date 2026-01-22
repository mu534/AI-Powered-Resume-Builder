import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";

const ResumeSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { personalDetails, resumeTitle } =
    (location.state as {
      personalDetails: PersonalDetails;
      resumeTitle: string;
    }) || {};

  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [themeColor, setThemeColor] = useState("#9333ea");
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState("#000000");

  // -----------------------------
  // AI SUMMARY GENERATION
  // -----------------------------
  const generateSummary = async () => {
    if (!personalDetails?.jobTitle) {
      setError("Job title is required to generate a summary.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prompt = `
You are a professional resume writer.

Write a concise, impactful resume summary (3–4 sentences) for the following candidate:

Name: ${personalDetails.firstName} ${personalDetails.lastName}
Job Title: ${personalDetails.jobTitle}

Focus on:
- Professional tone
- Skills & impact
- ATS-friendly language
- No emojis
`;

      const base = import.meta.env.VITE_API_URL || "http://localhost:5000";
      const response = await fetch(`${base}/api/ai/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        // Try to extract error message from server response for better feedback
        let errText = `AI generation failed (status ${response.status})`;
        try {
          const errBody = await response.json();
          if (errBody?.error) errText = String(errBody.error);
          else if (errBody?.message) errText = String(errBody.message);
        } catch (e) {
          console.error("Error parsing error response:", e);
          // ignore parse errors
        }
        throw new Error(errText);
      }

      const data = await response.json();
      setSummary((data.text || "").trim());
    } catch (err) {
      console.error("AI summary error:", err);
      setError("Failed to generate summary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // NAVIGATION
  // -----------------------------
  const handleNext = () => {
    navigate("/resume-experience", {
      state: {
        personalDetails,
        resumeTitle,
        summary,
        themeColor,
        fontSize,
        fontColor,
      },
    });
  };

  const isSummaryEmpty = summary.trim() === "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6">
      {/* Navbar */}
      <nav className="bg-white shadow w-full fixed top-0 left-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-purple-600 font-medium"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <div className="pt-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Left Panel */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold mb-2 text-purple-700">
            Resume Summary
          </h2>
          <p className="text-gray-600 mb-6">
            Generate a professional summary using AI or edit it manually.
          </p>

          {error && (
            <div className="mb-4 text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* Controls */}
          <div className="space-y-4">
            <input
              type="number"
              min={10}
              max={36}
              value={fontSize}
              onChange={(e) =>
                setFontSize(Math.max(10, Math.min(36, Number(e.target.value))))
              }
              className="w-full p-3 border rounded-lg"
              placeholder="Font size"
            />

            <input
              type="color"
              value={fontColor}
              onChange={(e) => setFontColor(e.target.value)}
              className="w-full h-12 rounded-lg"
            />

            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-full h-12 rounded-lg"
            />

            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Your professional summary..."
              className="w-full h-40 p-4 border rounded-lg resize-none"
              style={{ fontSize, color: fontColor }}
            />

            <button
              onClick={generateSummary}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:opacity-90 transition"
            >
              {loading ? "Generating..." : " Generate with AI"}
            </button>

            <button
              onClick={handleNext}
              disabled={isSummaryEmpty}
              className="w-full py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h3 className="text-xl font-semibold mb-4">Live Preview</h3>
          <ResumePreview
            personalDetails={personalDetails}
            resumeTitle={resumeTitle}
            summary={summary}
            themeColor={themeColor}
            fontSize={fontSize}
            fontColor={fontColor}
            experience={[]}
            education={[]}
            skills={[]}
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeSummary;
