import { useState } from "react";
import ResumeForm, { ResumeData } from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";
import { downloadPDF } from "./utils/pdfGenerator";

function App() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Resume Builder
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
        {/* Left Side: Resume Form */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Input:</h2>
          <ResumeForm setResumeData={setResumeData} />
        </div>

        {/* Right Side: Resume Preview */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">
            Preview:
          </h2>
          <ResumePreview data={resumeData} />
        </div>
      </div>

      {/* Download Button */}
      <div className="mt-6 text-center">
        <button
          onClick={downloadPDF}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
        >
          Download Resume as PDF
        </button>
      </div>
    </div>
  );
}

export default App;
