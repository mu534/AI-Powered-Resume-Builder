import React from "react";
import { motion } from "framer-motion";
import ResumeEditor from "../components/ResumeEditor";
import JobTracker from "../components/JobTracker";
import CoverLetterGen from "../components/CoverLetterGen";
import { Template } from "../types";
import { useNavigate } from "react-router-dom";

const templates: Template[] = [
  {
    id: "t1",
    name: "Sleek Modern",
    preview: "/modern.png",
    styles: {
      bg: "bg-gray-100",
      text: "text-gray-900",
      accent: "border-indigo-500",
    },
  },
  {
    id: "t2",
    name: "Bold Creative",
    preview: "/creative.png",
    styles: {
      bg: "bg-blue-100",
      text: "text-blue-900",
      accent: "border-blue-500",
    },
  },
];

interface DashboardProps {
  selectedTemplate: string;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<string>>;
}

const Dashboard: React.FC<DashboardProps> = ({
  selectedTemplate,
  setSelectedTemplate,
}) => {
  const navigate = useNavigate();
  const currentTemplate =
    templates.find((t) => t.id === selectedTemplate) || templates[0];

  const handleTemplateClick = () => {
    navigate("/templates");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-gray-100 min-h-screen"
    >
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8">
        Your Career Hub
      </h1>

      {/* Template Preview Section */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mb-6 p-4 rounded-xl shadow-lg bg-white flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all"
        onClick={handleTemplateClick}
      >
        <div>
          <h2 className="text-xl font-semibold text-indigo-900">
            Selected Template
          </h2>
          <p className={`text-lg font-medium ${currentTemplate.styles.text}`}>
            {currentTemplate.name}
          </p>
        </div>
        <div
          className={`w-24 h-24 rounded-lg ${currentTemplate.styles.bg} ${currentTemplate.styles.accent} border-2`}
        >
          <img
            src={currentTemplate.preview}
            alt={currentTemplate.name}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </motion.div>

      {/* Quick Template Selector */}
      <div className="mb-6">
        <label className="block text-indigo-900 font-semibold mb-2">
          Quick Select Template
        </label>
        <select
          value={selectedTemplate}
          onChange={(e) => setSelectedTemplate(e.target.value)}
          className="w-full max-w-xs p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {templates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.name}
            </option>
          ))}
        </select>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ResumeEditor />
        <JobTracker />
        <CoverLetterGen />
      </div>
    </motion.div>
  );
};

export default Dashboard;
