import { useState } from "react";
import ResumeForm, { ResumeData } from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { downloadPDF } from "../utils/pdfGenerator";

function Resume() {
  const [resumeData, setResumeData] = useState<ResumeData>({
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

  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadPDF();
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  // Convert arrays to strings for ResumePreview
  const resumePreviewData = {
    ...resumeData,
    skills: resumeData.skills.join(", "),
    certifications: resumeData.certifications.join(", "),
    projects: resumeData.projects.join(", "),
    languages: resumeData.languages.join(", "),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        AI-Powered Resume Builder
      </h1>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Left Side: Resume Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Build Your Resume
          </h2>
          <ResumeForm setResumeData={setResumeData} />
        </div>

        {/* Right Side: Resume Preview */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Live Preview
          </h2>
          <ResumePreview data={resumePreviewData} />
          <div className="mt-8 text-center">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? "Generating PDF..." : "Download Resume as PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Resume;
