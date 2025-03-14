import React, { ChangeEvent, useState, useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Define the ResumeData type
export interface ResumeData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  experience: string;
  skills: string[];
  education: string;
  summary: string;
  certifications: string[];
  projects: string[];
  languages: string[];
  achievements: string;
  links: string;
}

interface ResumeFormProps {
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const ResumeForm: React.FC<ResumeFormProps> = ({ setResumeData }) => {
  const [formData, setFormData] = useState<ResumeData>({
    name: "",
    jobTitle: "",
    email: "",
    phone: "",
    experience: "",
    skills: [],
    education: "",
    summary: "",
    certifications: [],
    projects: [],
    languages: [],
    achievements: "",
    links: "",
  });

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("resumeFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("resumeFormData", JSON.stringify(formData));
    setResumeData(formData);
  }, [formData, setResumeData]);

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle phone input change
  const handlePhoneChange = (value: string | undefined) => {
    setFormData((prev) => ({
      ...prev,
      phone: value || "",
    }));
  };

  // Handle dynamic array fields (skills, certifications, projects, languages)
  const handleArrayFieldChange = (
    field: keyof ResumeData,
    index: number,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addArrayField = (field: keyof ResumeData) => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...(prev[field] as string[]), ""],
    }));
  };

  const removeArrayField = (field: keyof ResumeData, index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: (prev[field] as string[]).filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">
        Build Your Resume
      </h2>
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        {/* Job Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="Software Developer"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="john.doe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <PhoneInput
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
          />
        </div>

        {/* Experience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Experience
          </label>
          <textarea
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="Describe your work experience"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={skill}
                onChange={(e) =>
                  handleArrayFieldChange("skills", index, e.target.value)
                }
                placeholder="Skill"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeArrayField("skills", index)}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("skills")}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Skill
          </button>
        </div>

        {/* Education */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Education
          </label>
          <textarea
            name="education"
            value={formData.education}
            onChange={handleChange}
            placeholder="Describe your education"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
          />
        </div>

        {/* Summary */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profile Summary
          </label>
          <textarea
            name="summary"
            value={formData.summary}
            onChange={handleChange}
            placeholder="Write a brief summary about yourself"
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
          />
        </div>

        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          {formData.certifications.map((certification, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={certification}
                onChange={(e) =>
                  handleArrayFieldChange(
                    "certifications",
                    index,
                    e.target.value
                  )
                }
                placeholder="Certification"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeArrayField("certifications", index)}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("certifications")}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Certification
          </button>
        </div>

        {/* Projects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Projects
          </label>
          {formData.projects.map((project, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={project}
                onChange={(e) =>
                  handleArrayFieldChange("projects", index, e.target.value)
                }
                placeholder="Project"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeArrayField("projects", index)}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("projects")}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Project
          </button>
        </div>

        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages
          </label>
          {formData.languages.map((language, index) => (
            <div key={index} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={language}
                onChange={(e) =>
                  handleArrayFieldChange("languages", index, e.target.value)
                }
                placeholder="Language"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
              />
              <button
                type="button"
                onClick={() => removeArrayField("languages", index)}
                className="p-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addArrayField("languages")}
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Add Language
          </button>
        </div>

        {/* Achievements */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Achievements
          </label>
          <textarea
            name="achievements"
            value={formData.achievements}
            onChange={handleChange}
            placeholder="List your achievements"
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
          />
        </div>

        {/* Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio/Links
          </label>
          <textarea
            name="links"
            value={formData.links}
            onChange={handleChange}
            placeholder="Add links to your portfolio or social profiles"
            rows={2}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
