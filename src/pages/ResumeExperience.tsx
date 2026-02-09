import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ResumePreview from "../components/ResumePreview";
import Button from "../Shared/components/Button";
import Card from "../Shared/components/Card";
import { PersonalDetails } from "../types";
import { generateResume } from "../services/aiService";
import LivePreviewIcon from "../components/LivePreviewIcon";
import NavBar from "../components/NavBar";
import LoadingSkeleton from "../components/AISkeleton";

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

  const [loadingIndex, setLoadingIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState(false);

  // Validation: all entries must have positionTitle and companyName
  useEffect(() => {
    const ok = experiences.every(
      (e) => e.positionTitle.trim() && e.companyName.trim(),
    );
    setIsValid(ok);
  }, [experiences]);

  const addExperience = () => {
    setExperiences((prev) => [
      ...prev,
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
    setExperiences((prev) => prev.filter((_, i) => i !== index));
  };

  const handleExperienceChange = (
    index: number,
    field: keyof Experience,
    value: string,
  ) => {
    setExperiences((prev) => {
      const updated = [...prev];
      updated[index][field] = value;
      return updated;
    });
  };

  const generateExperienceSummary = async (index: number, retries = 2) => {
    const exp = experiences[index];

    if (!exp.positionTitle || !exp.companyName) {
      setError("Please provide both job title and company name.");
      return;
    }

    // only set loading on first call
    if (retries === 2) {
      setLoadingIndex(index);
      setError(null);
    }

    try {
      const resp = await generateResume({
        firstName: personalDetails.firstName,
        lastName: personalDetails.lastName,
        role: exp.positionTitle,
        experience: [
          exp.summary ||
            "No additional experience details provided by the user.",
        ],
        skills: [],
      });

      const aiText = typeof resp === "string" ? resp.trim() : "";

      if (
        aiText.length < 60 ||
        /here['’]s\b/i.test(aiText) ||
        /as an ai|i am an ai|ai language model/i.test(aiText)
      ) {
       throw new Error("__LOW_QUALITY_AI__");

      }

      const combinedSummary = exp.summary
        ? `${exp.summary}\n\n${aiText}`
        : aiText;

      handleExperienceChange(index, "summary", combinedSummary);
    } catch (err) {
      const message = err instanceof Error ? err.message : "";

     
      if (message === "__LOW_QUALITY_AI__" && retries > 0) {
        await generateExperienceSummary(index, retries - 1);
        return;
      }

      
      if (message === "__LOW_QUALITY_AI__") {
        setError(
          "AI response wasn’t strong enough. Try adding more details or edit manually.",
        );
        return;
      }

      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate summary. Please try again.",
      );
    } finally {
      // only clear loading after LAST attempt
      if (retries === 0) {
        setLoadingIndex(null);
      }
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
      <NavBar />

      {/* Progress Bar */}
      <div className="fixed top-16 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-rgba(15,118,110,0.15)">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                4
              </div>
              <span className="font-semibold">Professional Experience</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded-full mx-4">
              <div className="h-full w-4/6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 4 of 6</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 flex-1 mt-12 flex flex-col items-center justify-center w-full max-w-6xl">
        <div className="flex flex-col md:flex-row gap-8 w-full">
          <Card className="w-full md:w-1/2">
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Professional Experience
            </h2>
            <p className="text-gray-600 mb-4">
              Add your previous job experiences to showcase your expertise.
            </p>
            {error && (
              <div className="mb-4 text-red-600 bg-red-50 p-2 rounded-md">
                {error}
              </div>
            )}

            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 border border-gray-100 rounded-md shadow-sm"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position Title
                      </label>
                      <input
                        type="text"
                        value={exp.positionTitle}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "positionTitle",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={exp.companyName}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "companyName",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., Tech Corp"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        value={exp.city}
                        onChange={(e) =>
                          handleExperienceChange(index, "city", e.target.value)
                        }
                        className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., San Francisco"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        value={exp.state}
                        onChange={(e) =>
                          handleExperienceChange(index, "state", e.target.value)
                        }
                        className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., CA"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={exp.startDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "startDate",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={exp.endDate}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "endDate",
                            e.target.value,
                          )
                        }
                        className="w-full p-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Summary
                    </label>
                    {loadingIndex === index ? (
                      <LoadingSkeleton lines={3} />
                    ) : (
                      <textarea
                        value={exp.summary}
                        onChange={(e) =>
                          handleExperienceChange(
                            index,
                            "summary",
                            e.target.value,
                          )
                        }
                        placeholder="Describe your role and achievements..."
                        className="w-full p-3 border border-gray-200 rounded-md resize-none h-28"
                        style={{ fontSize: `${fontSize}px`, color: fontColor }}
                      />
                    )}
                    <div className="mt-3 flex gap-2">
                      <Button
                        onClick={() => generateExperienceSummary(index)}
                        disabled={loadingIndex !== null || !exp.positionTitle}
                        className="flex-1"
                      >
                        {loadingIndex === index
                          ? "Generating…"
                          : "Generate with AI"}
                      </Button>
                      {experiences.length > 1 && (
                        <Button
                          variant="ghost"
                          onClick={() => removeExperience(index)}
                          className="text-red-600"
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2">
                <button
                  onClick={addExperience}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  + Add More Experience
                </button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button
                onClick={handleNext}
                disabled={!isValid}
                className="w-full"
              >
                Next Step
              </Button>
              <Button
                variant="secondary"
                onClick={handleBack}
                className="w-full"
              >
                Back
              </Button>
            </div>
          </Card>

          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200">
            <LivePreviewIcon />
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
