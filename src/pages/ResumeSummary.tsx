import React, { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";
import LivePreviewIcon from "../components/LivePreviewIcon";
import Button from "../Shared/components/Button";
import NavBar from "../components/NavBar";
import AISummarySkeleton from "../components/AISkeleton";

/* =======================
   Constants
======================= */
const DEFAULT_THEME_COLOR = "#9333ea";
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_COLOR = "#000000";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/* =======================
   Types
======================= */
interface LocationState {
  personalDetails: PersonalDetails;
  resumeTitle: string;
}

interface GenerateAIResponse {
  text?: string;
  error?: string;
  message?: string;
}

/* =======================
   Retry Helper
======================= */
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = 2,
): Promise<Response> => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error("Request failed");
    return response;
  } catch (error) {
    if (retries === 0) throw error;
    return fetchWithRetry(url, options, retries - 1);
  }
};

/* =======================
   API Service
======================= */
const generateAISummary = async (
  firstName: string,
  lastName: string,
): Promise<string> => {
  const prompt = `You are a professional resume writer.

Write a concise, impactful resume summary (3–4 sentences) for the following candidate:

Name: ${firstName} ${lastName}

Focus on:
- Professional tone
- Skills & impact
- ATS-friendly language
- No emojis

Output ONLY the resume summary. Do not include any introduction or your own text.`;

  const response = await fetchWithRetry(`${API_BASE_URL}/api/ai/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  const data: GenerateAIResponse = await response.json();
  const text = data.text?.trim() || "";

  // Remove prompt repetition if accidentally included
  return text
    .replace(
      new RegExp(
        `Here's a concise and impactful resume summary for ${firstName}.*?:`,
        "i",
      ),
      "",
    )
    .trim();
};

/* =======================
   Error Alert
======================= */
const ErrorAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
    <p className="text-sm text-red-800 font-medium">{message}</p>
  </div>
);

/* =======================
   Main Component
======================= */
const ResumeSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const locationState = location.state as LocationState | null;

  const [summary, setSummary] = useState("");
  const [themeColor] = useState(DEFAULT_THEME_COLOR);
  const [fontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontColor] = useState(DEFAULT_FONT_COLOR);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const personalDetails = locationState?.personalDetails;
  const resumeTitle = locationState?.resumeTitle || "";

  /* =======================
     Generate Summary
  ======================= */
  const generateSummary = useCallback(async () => {
    if (!personalDetails) {
      setError("Personal details are required.");
      return;
    }

    setLoading(true);
    setError(null);

    const previousSummary = summary; // 🛡 prevent overwrite

    try {
      const aiText = await generateAISummary(
        personalDetails.firstName,
        personalDetails.lastName,
      );

      // ✅ append instead of replace
      setSummary((prev) => (prev.trim() ? `${prev}\n\n${aiText}` : aiText));
    } catch (err) {
      console.error(err);
      setSummary(previousSummary); // restore text
      setError(
        err instanceof Error ? err.message : "Failed to generate summary",
      );
    } finally {
      setLoading(false);
    }
  }, [personalDetails, summary]);

  const handleNext = useCallback(() => {
    if (!summary.trim()) {
      setError("Summary cannot be empty.");
      return;
    }

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
  }, [
    navigate,
    personalDetails,
    resumeTitle,
    summary,
    themeColor,
    fontSize,
    fontColor,
  ]);

  const isSummaryEmpty = useMemo(() => summary.trim() === "", [summary]);

  if (!personalDetails) {
    return <div className="p-10 text-center">No resume data found.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <NavBar />

      <div className="pt-36 pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* LEFT */}
          <div>
            {error && <ErrorAlert message={error} />}

            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h1 className="text-3xl font-bold mb-4">Professional Summary</h1>

              {loading && <AISummarySkeleton />}

              <button
                onClick={generateSummary}
                disabled={loading}
                className="w-full mb-6 py-3 rounded-xl bg-purple-600 text-white font-semibold disabled:opacity-50"
              >
                {loading ? "Generating..." : "Generate with AI"}
              </button>

              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className="w-full h-48 p-4 border rounded-xl"
                placeholder="Write or generate your professional summary..."
              />

              <div className="mt-6 flex gap-3">
                <Button onClick={() => navigate("/ResumeHome")}>Back</Button>
                <Button onClick={handleNext} disabled={isSummaryEmpty}>
                  Next →
                </Button>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <LivePreviewIcon />
            <div className="bg-white rounded-2xl shadow-lg p-6">
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
      </div>
    </div>
  );
};

export default ResumeSummary;
