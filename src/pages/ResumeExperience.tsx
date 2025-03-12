import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Experience {
  positionTitle: string;
  companyName: string;
  city: string;
  state: string;
  startDate: string;
  endDate: string;
  summary: string;
}

const ResumeExperience: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    personalDetails,
    resumeTitle,
    summary,
    themeColor,
    fontSize,
    fontColor,
  } = (location.state as {
    personalDetails: PersonalDetails;
    resumeTitle: string;
    summary: string;
    themeColor: string;
    fontSize: number;
    fontColor: string;
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
    summary: "",
    themeColor: "#9333ea",
    fontSize: 16,
    fontColor: "#000000",
  };

  const [experiences, setExperiences] = useState<Experience[]>([
    {
      positionTitle: "",
      companyName: "",
      city: "",
      state: "",
      startDate: "",
      endDate: "",
      summary: "",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  const addExperience = () => {
    setExperiences([
      ...experiences,
      {
        positionTitle: "",
        companyName: "",
        city: "",
        state: "",
        startDate: "",
        endDate: "",
        summary: "",
      },
    ]);
  };

  const removeExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string
  ) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index][field] = value;
    setExperiences(updatedExperiences);
  };

  const generateExperienceSummary = async (index: number) => {
    if (!experiences[index].positionTitle) {
      setError("Please provide a valid job title.");
      return;
    }
    if (!genAI) {
      setError(
        "API key is missing or invalid. Please check your configuration."
      );
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const result = await model.generateContent(
        `Write a professional resume summary for a ${experiences[index].positionTitle} at ${experiences[index].companyName}. Keep it concise (2-3 sentences) and highlight skills, experience, and career goals relevant to this role.`
      );
      const aiResponse = result.response.text();
      if (aiResponse) {
        handleExperienceChange(index, "summary", aiResponse.trim());
      } else {
        throw new Error("AI response was empty or invalid.");
      }
    } catch (error) {
      console.error("Error generating AI summary with Gemini:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate summary. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    navigate("/resume-education", {
      state: {
        personalDetails,
        resumeTitle,
        summary,
        themeColor,
        fontSize,
        fontColor,
        experiences,
      },
    });
  };

  const handleBack = () => {
    navigate("/resume-summary", {
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
    <div className="min-h-screen bg-gradient-to-r from-gray-400 via-white to-gray-400 flex flex-col items-center justify-center p-4">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full fixed top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end items-center">
          <Link
            to="/Dashboard"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 flex-1 flex flex-col items-center justify-center w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          {/* Left Panel - Experience Form */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Professional Experience
            </h2>
            <p className="text-gray-600 mb-4">
              Add your previous job experiences to showcase your expertise.
            </p>
            {error && (
              <div className="mb-4 text-red-500 bg-red-100 p-2 rounded-lg">
                {error}
              </div>
            )}

            <div className="space-y-8">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="p-6 border border-gray-200 rounded-xl shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Position Title
                      </label>
                      <input
                        type="text"
                        value={exp.positionTitle}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "positionTitle",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "companyName",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., Tech Corp"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        value={exp.city}
                        onChange={(e) =>
                          handleExperienceChange(index, "city", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., San Francisco"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        value={exp.state}
                        onChange={(e) =>
                          handleExperienceChange(index, "state", e.target.value)
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                        placeholder="e.g., CA"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-2">Summary</label>
                    <textarea
                      value={exp.summary}
                      onChange={(e) =>
                        handleExperienceChange(index, "summary", e.target.value)
                      }
                      placeholder="Describe your role and achievements..."
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none h-36"
                      style={{ fontSize: `${fontSize}px`, color: fontColor }}
                    />
                    <button
                      onClick={() => generateExperienceSummary(index)}
                      className={`w-full mt-3 py-3 rounded-lg flex items-center justify-center gap-3 text-white font-medium transition-all duration-300 ${
                        loading || !exp.positionTitle
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl"
                      }`}
                      disabled={loading || !exp.positionTitle}
                    >
                      {loading ? (
                        <span className="animate-pulse">Generating...</span>
                      ) : (
                        <>
                          <span className="text-xl">✨</span> Generate with AI
                        </>
                      )}
                    </button>
                  </div>
                  {experiences.length > 1 && (
                    <button
                      onClick={() => removeExperience(index)}
                      className="text-red-600 hover:text-red-800 font-medium transition-colors"
                    >
                      - Remove Experience
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={addExperience}
                className="mt-4 text-purple-600 hover:text-purple-800 font-medium transition-colors"
              >
                + Add More Experience
              </button>
            </div>

            {/* Navigation Buttons */}
            <div className="mt-6 flex flex-col gap-3">
              <button
                onClick={handleNext}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
              >
                Next Step
              </button>
              <button
                onClick={handleBack}
                className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 shadow-md hover:shadow-lg transition-all duration-300 font-medium"
              >
                Back
              </button>
            </div>
          </div>

          {/* Right Panel - Resume Preview */}
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Live Preview
            </h3>
            <ResumePreview
              personalDetails={personalDetails}
              themeColor={themeColor}
              summary={summary}
              resumeTitle={resumeTitle}
              experience={experiences}
              fontSize={fontSize}
              fontColor={fontColor}
              education={[]}
              skills={[]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeExperience;
