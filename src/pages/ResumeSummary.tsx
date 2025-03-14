import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";

const ResumeSummary: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { personalDetails, resumeTitle } = (location.state as {
    personalDetails: PersonalDetails;
    resumeTitle: string;
  }) || {
    personalDetails: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
    },
    resumeTitle: "Untitled Resume",
  };

  const [summary, setSummary] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [themeColor, setThemeColor] = useState<string>("#9333ea");
  const [fontSize, setFontSize] = useState<number>(16);
  const [fontColor, setFontColor] = useState<string>("#000000");
  const [isThemeModalOpen, setIsThemeModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const generateSummary = () => {
    if (!personalDetails.jobTitle) {
      setError("Please provide a valid job title.");
      return;
    }

    setLoading(true);
    setError(null);

    // Generate a default summary without API
    const defaultSummary = `Experienced ${
      personalDetails.jobTitle
    } with a strong background in relevant skills and a proven track record of success. ${
      personalDetails.firstName
        ? `${personalDetails.firstName} ${personalDetails.lastName} is`
        : "I am"
    } eager to leverage expertise to contribute to innovative projects and achieve career goals in a dynamic environment.`;

    setTimeout(() => {
      // Simulate a brief "loading" delay
      setSummary(defaultSummary);
      setLoading(false);
    }, 1000); // 1-second delay for UX
  };

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-6">
      {/* Navbar */}
      <nav className="bg-white shadow-lg w-full fixed top-0 z-20 rounded-b-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-end items-center">
          <Link
            to="/Dashboard"
            className="text-gray-700 hover:text-purple-600 transition-colors duration-300 font-medium"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 flex-1 w-full max-w-6xl flex flex-col md:flex-row gap-10">
        {/* Left Panel - Summary Form and Settings */}
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full md:w-1/2 border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
            Craft Your Summary
          </h2>
          <p className="text-gray-600 mb-6">
            Create or generate a compelling summary for your job title.
          </p>
          {error && (
            <div className="mb-6 text-red-600 bg-red-50 p-3 rounded-lg shadow-sm">
              {error}
            </div>
          )}

          {/* Customization Inputs */}
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Font Size (px)
              </label>
              <input
                type="number"
                value={fontSize}
                onChange={(e) =>
                  setFontSize(
                    Math.max(10, Math.min(36, Number(e.target.value)))
                  )
                }
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
                min="10"
                max="36"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Font Color
              </label>
              <input
                type="color"
                value={fontColor}
                onChange={(e) => setFontColor(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Theme Color
              </label>
              <input
                type="color"
                value={themeColor}
                onChange={(e) => setThemeColor(e.target.value)}
                className="w-full h-12 rounded-lg border border-gray-200 cursor-pointer shadow-sm hover:shadow-md transition-shadow"
              />
            </div>

            {/* Summary Textarea */}
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Write or generate your summary here..."
              className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent resize-none h-36 transition-all"
              style={{ fontSize: `${fontSize}px`, color: fontColor }}
            />

            {/* Generate Button */}
            <button
              onClick={generateSummary}
              className={`w-full py-3 rounded-lg flex items-center justify-center gap-3 text-white font-medium transition-all duration-300 ${
                loading || !personalDetails.jobTitle
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
              }`}
              disabled={loading || !personalDetails.jobTitle}
            >
              {loading ? (
                <span className="animate-pulse">Generating...</span>
              ) : (
                <>
                  <span className="text-xl">✨</span> Generate Summary
                </>
              )}
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Right Panel - Resume Preview */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Live Preview
          </h3>
          <ResumePreview
            personalDetails={personalDetails}
            themeColor={themeColor}
            summary={summary}
            resumeTitle={resumeTitle}
            experience={[]}
            fontSize={fontSize}
            fontColor={fontColor}
            education={[]}
            skills={[]}
          />
        </div>
      </div>

      {/* Theme Modal */}
      {isThemeModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Select Theme Color
            </h3>
            <input
              type="color"
              value={themeColor}
              onChange={(e) => setThemeColor(e.target.value)}
              className="w-full h-12 rounded-lg border border-gray-200 cursor-pointer mb-4"
            />
            <button
              onClick={() => setIsThemeModalOpen(false)}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeSummary;
