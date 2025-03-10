import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Education {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Experience {
  positionTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  summary: string;
}

const ResumeEducation: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Debugging: Log location.state to inspect its contents
  console.log("location.state:", location.state);

  // Destructure with fallback values
  const {
    personalDetails = {
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
    },
    resumeTitle = "Untitled Resume",
    summary = "",
    experiences = [],
    educations: initialEducations = [],
    themeColor = "#9333ea",
    fontSize = 16,
    fontColor = "#000000",
  } = (location.state as {
    personalDetails?: PersonalDetails;
    resumeTitle?: string;
    summary?: string;
    experiences?: Experience[];
    educations?: Education[];
    themeColor?: string;
    fontSize?: number;
    fontColor?: string;
  }) || {};

  // Initialize state with fallback values
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  // Ensure educations is always an array
  useEffect(() => {
    if (!Array.isArray(educations)) {
      setEducations([]);
    }
  }, [educations]);

  const addEducation = () => {
    setEducations([
      ...educations,
      {
        universityName: "",
        degree: "",
        major: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    setEducations(educations.filter((_, i) => i !== index));
  };

  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string
  ) => {
    const updatedEducations = [...educations];
    updatedEducations[index][field] = value;
    setEducations(updatedEducations);
  };

  const generateEducationDescription = async (index: number) => {
    if (!educations[index].degree || !educations[index].major) {
      setError("Please provide a degree and major.");
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
        `Write a brief description for a ${educations[index].degree} in ${educations[index].major} at ${educations[index].universityName}. Keep it concise (2-3 sentences) and highlight relevant skills or achievements.`
      );
      const aiResponse = result.response.text();
      if (aiResponse) {
        handleEducationChange(index, "description", aiResponse.trim());
      } else {
        throw new Error("AI response was empty or invalid.");
      }
    } catch (error) {
      console.error("Error generating AI description with Gemini:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to generate description. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    navigate("/resume-skills", {
      state: {
        personalDetails,
        resumeTitle,
        summary,
        experiences,
        educations,
        themeColor,
        fontSize,
        fontColor,
      },
    });
  };

  const handleBack = () => {
    navigate("/resume-experience", {
      state: {
        personalDetails,
        resumeTitle,
        summary,
        experiences,
        educations,
        themeColor,
        fontSize,
        fontColor,
      },
    });
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="bg-white shadow-md w-full fixed top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end items-center">
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition-colors"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      <motion.div className="pt-20 pb-12 px-4 flex-1 flex items-center justify-center w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <motion.div
            className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2 border border-gray-200"
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">Education</h2>
            <p className="text-gray-600 mb-4">Add Your educational details</p>
            {error && (
              <div className="mb-4 text-red-500 bg-red-100 p-2 rounded-lg">
                {error}
              </div>
            )}

            {Array.isArray(educations) &&
              educations.map((edu, index) => (
                <div
                  key={index}
                  className="mb-6 p-4 border border-gray-200 rounded-lg"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        University Name
                      </label>
                      <input
                        type="text"
                        value={edu.universityName}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "universityName",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., University of Michigan"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1">Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(index, "degree", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., Bachelor of Science"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">Major</label>
                      <input
                        type="text"
                        value={edu.major}
                        onChange={(e) =>
                          handleEducationChange(index, "major", e.target.value)
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg"
                        placeholder="e.g., Computer Science"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={edu.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "startDate",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={edu.endDate}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "endDate",
                            e.target.value
                          )
                        }
                        className="w-full p-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(
                          index,
                          "description",
                          e.target.value
                        )
                      }
                      placeholder="Add or edit your description here"
                      className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none h-32"
                      style={{ fontSize: `${fontSize}px`, color: fontColor }}
                    />
                    <button
                      onClick={() => generateEducationDescription(index)}
                      className={`
                      mt-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full flex items-center gap-2
                      transition-colors duration-200
                      ${
                        loading || !edu.degree || !edu.major
                          ? "cursor-not-allowed bg-gray-300 text-gray-500"
                          : "hover:bg-gray-200 cursor-pointer"
                      }
                    `}
                      disabled={loading || !edu.degree || !edu.major}
                    >
                      {loading ? (
                        "Generating..."
                      ) : (
                        <>
                          <span className="text-xl">🤖</span> Generate from AI
                        </>
                      )}
                    </button>
                  </div>
                  {educations.length > 1 && (
                    <button
                      onClick={() => removeEducation(index)}
                      className="mt-2 text-purple-600 hover:text-purple-800"
                    >
                      - Remove
                    </button>
                  )}
                </div>
              ))}
            <button
              onClick={addEducation}
              className="mt-4 text-purple-600 hover:text-purple-800"
            >
              + Add More Education
            </button>
            <button
              onClick={handleNext}
              className="w-full mt-4 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Next
            </button>
            <button
              onClick={handleBack}
              className="w-full mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Back
            </button>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200"
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResumePreview
              personalDetails={personalDetails}
              themeColor={themeColor}
              summary={summary}
              resumeTitle={resumeTitle}
              experience={experiences}
              education={educations}
              fontSize={fontSize}
              fontColor={fontColor}
              skills={[]}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeEducation;
