import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import ResumePreview from "../components/ResumePreview";
import { PersonalDetails } from "../types";

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

const ResumeSkills: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    personalDetails,
    resumeTitle,
    summary,
    experiences, // Changed from any[] to Experience[]
    educations, // Changed from any[] to Education[]
    themeColor,
    fontSize,
    fontColor,
  } = (location.state as {
    personalDetails: PersonalDetails;
    resumeTitle: string;
    summary: string;
    experiences: Experience[]; // Explicitly typed
    educations: Education[]; // Explicitly typed
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
    experiences: [], // Default to empty array of Experience type
    educations: [], // Default to empty array of Education type
    themeColor: "#9333ea",
    fontSize: 16,
    fontColor: "#000000",
  };

  const [skills, setSkills] = useState<Skill[]>([
    { name: "", level: "Intermediate" },
  ]);
  const [error] = useState<string | null>(null);

  const addSkill = () => {
    setSkills([...skills, { name: "", level: "Intermediate" }]);
  };

  const removeSkill = (index: number) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleSkillChange = (
    index: number,
    field: keyof Skill,
    value: string
  ) => {
    const updatedSkills = [...skills];
    updatedSkills[index][field] = value;
    setSkills(updatedSkills);
  };

  const handleNext = () => {
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
  };

  const handleBack = () => {
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
  };

  return (
    <motion.div
      className="min-h-screen bg-white flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="bg-white shadow-md w-full fixed top-0 z-10">
        <div className=" flex justify-end max-w-6xl mx-auto px-4 py-4  items-center">
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
            <h2 className="text-xl font-bold text-gray-900 mb-2">Skills</h2>
            <p className="text-gray-600 mb-4">Add Your skills details</p>
            {error && (
              <div className="mb-4 text-red-500 bg-red-100 p-2 rounded-lg">
                {error}
              </div>
            )}

            {skills.map((skill, index) => (
              <div
                key={index}
                className="mb-6 p-4 border border-gray-200 rounded-lg"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-gray-700 mb-1">
                      Skill Name
                    </label>
                    <input
                      type="text"
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange(index, "name", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="e.g., JavaScript"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-1">Level</label>
                    <select
                      value={skill.level}
                      onChange={(e) =>
                        handleSkillChange(index, "level", e.target.value)
                      }
                      className="w-full p-2 border border-gray-300 rounded-lg"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                  </div>
                </div>
                {skills.length > 1 && (
                  <button
                    onClick={() => removeSkill(index)}
                    className="mt-2 text-purple-600 hover:text-purple-800"
                  >
                    - Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSkill}
              className="mt-4 text-purple-600 hover:text-purple-800"
            >
              + Add More Skills
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
              skills={skills}
              fontSize={fontSize}
              fontColor={fontColor}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeSkills;
