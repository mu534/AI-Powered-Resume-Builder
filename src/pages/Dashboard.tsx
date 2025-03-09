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
      bg: "bg-gray-100",
      text: "text-gray-900",
      accent: "border-indigo-500",
    },
  },
  {
    id: "t2",
    name: "Bold Creative",
    preview: creative,
    styles: {
      bg: "bg-blue-100",
      text: "text-blue-900",
      accent: "border-blue-500",
    },
  },
  {
    id: "t3",
    name: "Classic Professional",
    preview: classic,
    styles: { bg: "bg-white", text: "text-black", accent: "border-gray-500" },
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
    <div className="min-h-screen bg-gradient-to-br bg-white  to-gray-100 ">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4  flex justify-end">
          <Link to="/ResumeRoot">
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 mr-8">
              Go to Resume Editor
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight text-center mt-15">
            Welcome to <span className="text-blue-600">ResumeAI</span>
          </h1>
          <p className="text-xl text-gray-600 text-center">
            Craft Your Perfect Resume with AI Precision
          </p>

          {/* Template Preview Section */}
          <div
            className="p-4 rounded-xl shadow-lg bg-white flex flex-col md:flex-row items-center justify-between cursor-pointer hover:bg-gray-50 transition-all max-w-3xl mx-auto"
            onClick={() => navigate("/templates")}
          >
            <div className="flex-1 text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-xl font-semibold text-indigo-900">
                <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Selected Template
                </button>
              </h2>
              <p
                className={`text-lg font-medium mt-2 ${currentTemplate.styles.text}`}
              >
                {currentTemplate.name}
              </p>
            </div>
            <div
              className={`w-64 h-64 md:w-80 md:h-80 rounded-lg ${currentTemplate.styles.bg} ${currentTemplate.styles.accent} border-2`}
            >
              <img
                src={currentTemplate.preview}
                alt={currentTemplate.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Quick Template Selector */}
          <div className="max-w-3xl mx-auto text-center">
            <label className="block text-indigo-900 font-semibold mb-2">
              Quick Select Template
            </label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full max-w-xs p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mx-auto block"
            >
              {templates.map((template) => (
                <option key={template.id} value={template.id}>
                  {template.name}
                </option>
              ))}
            </select>
          </div>

          {/* Cover Letter Generator */}
          <div className="rounded-lg shadow-md">
            <CoverLetterGen />
          </div>

          {/* Call to Action */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">
              Ready to Enhance Your Career?
            </h2>
            <p className="text-gray-600">
              Start building your future today with ResumeAI’s powerful tools!
            </p>
            <Link to="/ResumeRoot">
              <button className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
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
