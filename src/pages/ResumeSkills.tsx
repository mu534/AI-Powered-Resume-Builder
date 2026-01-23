import React, { useState, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";

// Types
interface Skill {
  name: string;
  level: string;
}

interface Experience {
  positionTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  summary: string;
}

interface Education {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface LocationState {
  personalDetails: PersonalDetails;
  resumeTitle: string;
  summary: string;
  experiences: Experience[];
  educations: Education[];
  themeColor: string;
  fontSize: number;
  fontColor: string;
}

// Constants
const DEFAULT_STATE: LocationState = {
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
  experiences: [],
  educations: [],
  themeColor: "#9333ea",
  fontSize: 16,
  fontColor: "#000000",
};

const SKILL_LEVELS = [
  "Beginner",
  "Intermediate",
  "Advanced",
  "Expert",
] as const;

const INITIAL_SKILL: Skill = { name: "", level: "Intermediate" };

// Components
const SkillCard: React.FC<{
  skill: Skill;
  index: number;
  onUpdate: (index: number, field: keyof Skill, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}> = ({ skill, index, onUpdate, onRemove, canRemove }) => (
  <div className="group p-6 border-2 border-gray-100 rounded-2xl hover:border-purple-200 transition-all bg-gradient-to-br from-white to-gray-50">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
          <svg
            className="w-5 h-5 text-purple-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            />
          </svg>
        </div>
        <span className="text-sm font-semibold text-gray-500">
          Skill #{index + 1}
        </span>
      </div>
      {canRemove && (
        <button
          onClick={() => onRemove(index)}
          className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-lg"
          aria-label="Remove skill"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      )}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Skill Name
        </label>
        <input
          type="text"
          value={skill.name}
          onChange={(e) => onUpdate(index, "name", e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
          placeholder="e.g., JavaScript, Python, Design"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Proficiency Level
        </label>
        <select
          value={skill.level}
          onChange={(e) => onUpdate(index, "level", e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white cursor-pointer"
        >
          {SKILL_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>

    {/* Skill level indicator */}
    <div className="mt-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium text-gray-500">Proficiency</span>
        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-300"
            style={{
              width:
                skill.level === "Beginner"
                  ? "25%"
                  : skill.level === "Intermediate"
                    ? "50%"
                    : skill.level === "Advanced"
                      ? "75%"
                      : "100%",
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

// Main Component
const ResumeSkills: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = (location.state as LocationState) || DEFAULT_STATE;
  const {
    personalDetails,
    resumeTitle,
    summary,
    experiences,
    educations,
    themeColor,
    fontSize,
    fontColor,
  } = state;

  const [skills, setSkills] = useState<Skill[]>([INITIAL_SKILL]);

  const addSkill = useCallback(() => {
    setSkills((prev) => [...prev, INITIAL_SKILL]);
  }, []);

  const removeSkill = useCallback((index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleSkillChange = useCallback(
    (index: number, field: keyof Skill, value: string) => {
      setSkills((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], [field]: value };
        return updated;
      });
    },
    [],
  );

  const handleNext = useCallback(() => {
    navigate("/resume-final", {
      state: {
        personalDetails,
        resumeTitle,
        summary,
        experiences,
        educations,
        skills,
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
    experiences,
    educations,
    skills,
    themeColor,
    fontSize,
    fontColor,
  ]);

  const handleBack = useCallback(() => {
    navigate("/resume-education", {
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
  }, [
    navigate,
    personalDetails,
    resumeTitle,
    summary,
    experiences,
    educations,
    themeColor,
    fontSize,
    fontColor,
  ]);

  const hasValidSkills = skills.some((skill) => skill.name.trim() !== "");

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
                4
              </div>
              <span className="font-semibold">Skills & Expertise</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded-full mx-4">
              <div className="h-full w-4/5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 4 of 5</span>
          </div>
        </div>
      </div>

      <div className="pt-36 pb-12 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Skills Editor */}
          <div className="space-y-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-white/20">
              <div className="mb-8">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  Showcase Your Skills
                </h1>
                <p className="text-gray-600">
                  Add your technical and professional skills to highlight your
                  expertise.
                </p>
              </div>

              {/* Skills List */}
              <div className="space-y-4 mb-6">
                {skills.map((skill, index) => (
                  <SkillCard
                    key={index}
                    skill={skill}
                    index={index}
                    onUpdate={handleSkillChange}
                    onRemove={removeSkill}
                    canRemove={skills.length > 1}
                  />
                ))}
              </div>

              {/* Add More Button */}
              <button
                onClick={addSkill}
                className="w-full py-3 rounded-xl border-2 border-dashed border-purple-300 text-purple-600 hover:bg-purple-50 hover:border-purple-400 transition-all font-medium flex items-center justify-center gap-2 group"
              >
                <svg
                  className="w-5 h-5 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add Another Skill
              </button>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleBack}
                className="py-4 rounded-xl border-2 border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all flex items-center justify-center gap-2"
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
                    d="M11 17l-5-5m0 0l5-5m-5 5h12"
                  />
                </svg>
                Back
              </button>

              <button
                onClick={handleNext}
                disabled={!hasValidSkills}
                className="py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
              >
                Continue
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

            {/* Skills Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 border border-purple-100">
              <div className="flex items-start gap-3">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 mb-1">Pro Tip</h4>
                  <p className="text-sm text-gray-600">
                    Add 5-10 relevant skills. Mix technical skills with soft
                    skills for a well-rounded profile. Be honest about your
                    proficiency levels.
                  </p>
                </div>
              </div>
            </div>
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
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-sm text-gray-600 font-medium">
                    Live
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 overflow-auto max-h-[calc(100vh-300px)]">
                <ResumePreview
                  personalDetails={personalDetails}
                  themeColor={themeColor}
                  summary={summary}
                  resumeTitle={resumeTitle}
                  experience={experiences}
                  education={educations}
                  skills={skills}
                  fontSize={fontSize}
                  fontColor={fontColor}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeSkills;
