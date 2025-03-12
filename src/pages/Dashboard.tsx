import React from "react";
import { Link, useNavigate } from "react-router-dom";
import CoverLetterGen from "../components/CoverLetterGen";
import { Template } from "../types/";
import bold from "../assets/images/bold.png";
import creative from "../assets/images/creative.png";
import classic from "../assets/images/classic.png";
import Footer from "../components/Footer";

const templates: Template[] = [
  {
    id: "t1",
    name: "Sleek Modern",
    preview: bold,
    styles: {
      bg: "bg-gradient-to-br from-gray-100 to-gray-200",
      text: "text-gray-900",
      accent: "border-indigo-500",
    },
  },
  {
    id: "t2",
    name: "Bold Creative",
    preview: creative,
    styles: {
      bg: "bg-gradient-to-br from-blue-100 to-blue-200",
      text: "text-blue-900",
      accent: "border-blue-500",
    },
  },
  {
    id: "t3",
    name: "Classic Professional",
    preview: classic,
    styles: {
      bg: "bg-gradient-to-br from-white to-gray-50",
      text: "text-black",
      accent: "border-gray-500",
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-10 top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
          <Link to="/ResumeRoot">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
              Go to Resume Editor
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Craft Your Perfect Resume with AI Precision
            </p>
          </div>

          {/* Template Preview Section */}
          <div
            className="p-6 rounded-2xl shadow-xl bg-white hover:shadow-2xl transition-all duration-300 max-w-3xl mx-auto cursor-pointer"
            onClick={() => navigate("/templates")}
          >
            <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Selected Template
                </h2>
                <p
                  className={`text-xl font-medium mt-2 ${currentTemplate.styles.text}`}
                >
                  {currentTemplate.name}
                </p>
              </div>
              <div
                className={`w-64 h-64 md:w-80 md:h-80 rounded-2xl ${currentTemplate.styles.bg} ${currentTemplate.styles.accent} border-4 overflow-hidden transform hover:scale-105 transition-all duration-300`}
              >
                <img
                  src={currentTemplate.preview}
                  alt={currentTemplate.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Quick Template Selector */}
          <div className="max-w-3xl mx-auto text-center">
            <label className="block text-gray-900 font-semibold mb-3 text-lg">
              Quick Select Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full max-w-xs p-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Letter Generator */}
          <div className="rounded-2xl shadow-lg bg-white p-6">
            <CoverLetterGen />
          </div>

          {/* Call to Action */}
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Ready to Enhance Your Career?
            </h2>
            <p className="text-xl text-gray-600">
              Start building your future today with ResumeAI’s powerful tools!
            </p>
            <Link to="/ResumeRoot">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                Go to Resume Editor
              </button>
            </Link>
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
