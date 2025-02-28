import React, { ChangeEvent, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

// Define the ResumeData type
export interface ResumeData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  education: string;
  summary: string;
  certifications: string;
  projects: string;
  languages: string;
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
    skills: "",
    education: "",
    summary: "",
    certifications: "",
    projects: "",
    languages: "",
    achievements: "",
    links: "",
  });

  // Handle form field changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setResumeData((prev) => ({
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
    setResumeData((prev) => ({
      ...prev,
      phone: value || "",
    }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-white shadow-lg rounded-lg w-full max-w-full">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 text-center text-blue-600">
        Resume Details
      </h2>
      <div className="space-y-4 sm:space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Jmudasir"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
          />
        </div>{" "}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Job Title
          </label>
          <input
            type="text"
            name="jobTitle"
            placeholder="developer"
            value={formData.jobTitle}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
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
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
          />
        </div>
        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <PhoneInput
            placeholder="Phone"
            value={formData.phone}
            onChange={handlePhoneChange}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base"
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
            placeholder="Experience"
            rows={3}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
        </div>
        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Skills
          </label>
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="Skills (comma-separated)"
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
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
            placeholder="Education"
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
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
            placeholder="Profile Summary"
            rows={3}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
        </div>
        {/* Certifications */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Certifications
          </label>
          <textarea
            name="certifications"
            value={formData.certifications}
            onChange={handleChange}
            placeholder="Certifications"
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
        </div>
        {/* Projects */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Projects
          </label>
          <textarea
            name="projects"
            value={formData.projects}
            onChange={handleChange}
            placeholder="Projects"
            rows={3}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
        </div>
        {/* Languages */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Languages
          </label>
          <textarea
            name="languages"
            value={formData.languages}
            onChange={handleChange}
            placeholder="Languages (comma-separated)"
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
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
            placeholder="Achievements"
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
        </div>
        {/* Portfolio/Links */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Portfolio/Links
          </label>
          <textarea
            name="links"
            value={formData.links}
            onChange={handleChange}
            placeholder="Portfolio/Links"
            rows={2}
            className="w-full p-2 sm:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 text-sm sm:text-base resize-y"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeForm;
