import React, { useState, useCallback, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";

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
  jobTitle: string,
): Promise<string> => {
  const prompt = `You are a professional resume writer.

Write a concise, impactful resume summary (3–4 sentences) for the following candidate:

Name: ${firstName} ${lastName}
Job Title: ${jobTitle}

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

const StyledInput: React.FC<{
  label: string;
  type: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  placeholder?: string;
  className?: string;
}> = ({
  label,
  type,
  value,
  onChange,
  min,
  max,
  placeholder,
  className = "",
}) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      placeholder={placeholder}
      className={`w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all ${className}`}
      aria-label={label}
    />
  </div>
);

const ColorPicker: React.FC<{
  label: string;
  value: string;
  onChange: (color: string) => void;
}> = ({ label, value, onChange }) => (
  <div className="space-y-2">
    <label className="block text-sm font-semibold text-gray-700">{label}</label>
    <div className="relative">
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        aria-label={label}
      />
      <div className="w-full h-12 rounded-xl border-2 border-gray-200 flex items-center px-4 gap-3 hover:border-purple-400 transition-colors cursor-pointer">
        <div
          className="w-8 h-8 rounded-lg shadow-sm border border-gray-200"
          style={{ backgroundColor: value }}
        />
        <span className="text-sm font-mono text-gray-600">{value}</span>
      </div>
    </div>
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
    setThemeColor,
    fontSize,
    handleFontSizeChange,
    fontColor,
    setFontColor,
    personalDetails,
    resumeTitle,
  } = useResumeState(locationState);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = useCallback(async () => {
    if (!personalDetails?.jobTitle) {
      setError("Job title is required to generate a summary.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const generatedSummary = await generateAISummary(
        personalDetails.firstName,
        personalDetails.lastName,
        personalDetails.jobTitle,
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
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            No Resume Data Found
          </h2>
          <p className="text-gray-600 mb-8">
            Please start by creating a new resume from the dashboard.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:-translate-y-0.5 transition-all font-medium"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm w-full fixed top-0 left-0 z-20 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="font-bold text-gray-800">Resume Builder</span>
          </div>
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-gray-700 hover:text-purple-600 font-medium transition-colors px-4 py-2 rounded-lg hover:bg-purple-50"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="fixed top-16 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-purple-600">
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
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                    <svg
                      className="w-6 h-6 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
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
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Generate with AI
                    </>
                  )}
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

            {/* Customization Panel */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
                Customize Appearance
              </h3>

              <div className="grid grid-cols-2 gap-6">
                <StyledInput
                  label="Font Size"
                  type="number"
                  value={fontSize}
                  onChange={(e) => handleFontSizeChange(Number(e.target.value))}
                  min={MIN_FONT_SIZE}
                  max={MAX_FONT_SIZE}
                  placeholder="16"
                />

                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">
                    Quick Sizes
                  </label>
                  <div className="flex gap-2">
                    {[14, 16, 18, 20].map((size) => (
                      <button
                        key={size}
                        onClick={() => handleFontSizeChange(size)}
                        className={`flex-1 py-2 rounded-lg border-2 transition-all text-sm font-medium ${
                          fontSize === size
                            ? "border-purple-600 bg-purple-50 text-purple-700"
                            : "border-gray-200 hover:border-purple-300 text-gray-600"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mt-6">
                <ColorPicker
                  label="Text Color"
                  value={fontColor}
                  onChange={setFontColor}
                />

                <ColorPicker
                  label="Theme Color"
                  value={themeColor}
                  onChange={setThemeColor}
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={handleNext}
              disabled={isSummaryEmpty}
              className="w-full py-4 rounded-xl bg-gray-900 text-white font-semibold hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
            >
              Continue to Experience
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          </div>

          {/* Right Panel - Preview */}
          <div className="lg:sticky lg:top-36 lg:self-start">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Live Preview
                </h3>
                <span className="text-sm px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  Live
                </span>
              </div>
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
