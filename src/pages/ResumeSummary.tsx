import React, { useState, useCallback, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";
import LivePreviewIcon from "../components/LivePreviewIcon";
import Button from "../Shared/components/Button";
import NavBar from "../components/NavBar";

// Constants
const DEFAULT_THEME_COLOR = "#9333ea";
const DEFAULT_FONT_SIZE = 16;
const DEFAULT_FONT_COLOR = "#000000";
const MIN_FONT_SIZE = 10;
const MAX_FONT_SIZE = 36;

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Types
interface LocationState {
  personalDetails: PersonalDetails;
  resumeTitle: string;
}

interface GenerateAIResponse {
  text?: string;
  error?: string;
  message?: string;
}

// Custom hooks
const useResumeState = (initialState: LocationState | null) => {
  const [summary, setSummary] = useState("");
  const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR);
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [fontColor, setFontColor] = useState(DEFAULT_FONT_COLOR);

  const handleFontSizeChange = useCallback((value: number) => {
    setFontSize(Math.max(MIN_FONT_SIZE, Math.min(MAX_FONT_SIZE, value)));
  }, []);

  return {
    summary,
    setSummary,
    themeColor,
    setThemeColor,
    fontSize,
    handleFontSizeChange,
    fontColor,
    setFontColor,
    personalDetails: initialState?.personalDetails,
    resumeTitle: initialState?.resumeTitle || "",
  };
};

// API service
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
- No emojis`;

  const response = await fetch(`${API_BASE_URL}/api/ai/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    let errorMessage = `AI generation failed (status ${response.status})`;

    try {
      const errorBody: GenerateAIResponse = await response.json();
      if (errorBody?.error) {
        errorMessage = String(errorBody.error);
      } else if (errorBody?.message) {
        errorMessage = String(errorBody.message);
      }
    } catch {
      // Ignore JSON parse errors
    }

    throw new Error(errorMessage);
  }

  const data: GenerateAIResponse = await response.json();
  return (data.text || "").trim();
};

// Components
const ErrorAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="mb-6 flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
    <svg
      className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
    <p className="text-sm text-red-800 font-medium">{message}</p>
  </div>
);

// Main Component
const ResumeSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as LocationState | null;
  const {
    summary,
    setSummary,
    themeColor,
    fontSize,
    fontColor,
    personalDetails,
    resumeTitle,
  } = useResumeState(locationState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = useCallback(async () => {
    if (!personalDetails) {
      setError(
        "Personal details is required to is required to generate a summary.",
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedSummary = await generateAISummary(
        personalDetails.firstName,
        personalDetails.lastName,
      );
      setSummary(generatedSummary);
    } catch (err) {
      console.error("AI summary error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate summary. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [personalDetails, setSummary]);

  const handleNext = useCallback(() => {
    if (!personalDetails || !resumeTitle || resumeTitle.trim() === "") {
      setError("Missing required information. Please start over.");
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

  // Redirect if no personal details
  if (!personalDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-6">
        <div className="bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl text-center max-w-md border border-white/20">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Resume Data Found
          </h2>
          <p className="text-gray-600 mb-8">
            Please start by creating a new resume from the dashboard.
          </p>
        </div>
      </div>
    );
  }

  const handleBack = () => {
    navigate("/ResumeHome", {});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <NavBar />
      {/* Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 bg-white/80 backdrop-blur-md border-b  border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-rgba(15,118,110,0.15)">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                2
              </div>
              <span className="font-semibold">Professional Summary</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded-full mx-4">
              <div className="h-full w-1/3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 2 of 5</span>
          </div>
        </div>
      </div>

      <div className="pt-36 pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Editor */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  Craft Your Professional Summary
                </h1>
                <p className="text-gray-600">
                  Let AI create a compelling summary or write your own to
                  showcase your expertise.
                </p>
              </div>

              {error && <ErrorAlert message={error} />}

              {/* AI Generation Section */}
              <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl border border-purple-100">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">
                      AI-Powered Generation
                    </h3>
                    <p className="text-sm text-gray-600">
                      Generate a professional summary tailored to your role in
                      seconds
                    </p>
                  </div>
                </div>
                <button
                  onClick={generateSummary}
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                >
                  {loading ? <>Generating...</> : <>Generate with AI</>}
                </button>
              </div>

              {/* Summary Editor */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Your Professional Summary
                  </label>
                  <textarea
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Write or generate a compelling professional summary that highlights your expertise, achievements, and career goals..."
                    className="w-full h-48 p-4 border border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    style={{ fontSize, color: fontColor }}
                    aria-label="Resume summary"
                  />
                  <p className="text-sm text-gray-500">
                    {summary.length} characters • Aim for 300-500 characters
                  </p>
                </div>
              </div>
            </div>

            {/* Action Button */}

            <div className="mt-6 flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={handleBack}
                className="border border-gray-200 px-14 py-2 rounded-md hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={isSummaryEmpty}
                className="border border-gray-200 px-14 py-2 rounded-md hover:bg-gray-50"
              >
                Next →
              </Button>
            </div>
          </div>

          <div>
            <LivePreviewIcon />
            <div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-auto max-h-[calc(100vh-300px)]">
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
    </div>
  );
};

export default ResumeSummary;
