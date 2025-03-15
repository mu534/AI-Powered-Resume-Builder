import React, { useState } from "react";
import { CoverLetter } from "../types/";
import { GoogleGenerativeAI } from "@google/generative-ai";

interface CoverLetterForm {
  recipient: string;
  jobTitle: string;
  company: string;
  intro: string;
  skills: string;
  closing: string;
  tone: CoverLetter["tone"];
}

const CoverLetterGen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<CoverLetterForm>({
    recipient: "Hiring Manager",
    jobTitle: "Frontend Developer",
    company: "TechCorp",
    intro: "I’m excited to apply for the Frontend Developer role at TechCorp.",
    skills: "I bring expertise in React, TypeScript, and modern UI/UX design.",
    closing:
      "I’d love the opportunity to discuss how I can contribute to your team.",
    tone: "Conversational",
  });

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
  console.log("API Key in CoverLetterGen:", apiKey); // Debug log
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  const generateLetter = async () => {
    if (!form.jobTitle || !form.company) {
      setError("Please provide a valid job title and company.");
      return;
    }
    if (!genAI) {
      setError(
        "API key is missing or invalid. Please check your configuration."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
      const prompt = `Generate a professional cover letter for a ${
        form.jobTitle
      } position at ${form.company}. Include:
        1. An introduction addressed to "${
          form.recipient
        }" expressing interest in the role (1-2 sentences).
        2. A skills paragraph highlighting relevant expertise and experience (2-3 sentences).
        3. A closing statement requesting further discussion (1-2 sentences).
        Use a ${form.tone.toLowerCase()} tone throughout. Return the response with clear paragraph breaks.`;

      const result = await model.generateContent(prompt);
      const aiResponse = result.response.text().trim();

      if (aiResponse) {
        const [intro, skills, closing] = aiResponse.split("\n\n");
        setForm((prev) => ({
          ...prev,
          intro: intro || prev.intro,
          skills: skills || prev.skills,
          closing: closing || prev.closing,
        }));
      } else {
        throw new Error("AI response was empty or invalid.");
      }
    } catch (err) {
      console.error("Error generating cover letter with Gemini:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate cover letter. Please try again later."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (field: keyof CoverLetterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const fullLetter = `Dear ${form.recipient},\n${form.intro}\n\n${form.skills}\n\n${form.closing}\n\nSincerely,\n[Your Name]`;

  const handleDownload = () => {
    const blob = new Blob([fullLetter], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cover_letter_${form.jobTitle}_${form.company}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-10 rounded-3xl shadow-2xl bg-gradient-to-br from-white via-gray-50 to-indigo-100 hover:shadow-3xl transition-all duration-500 max-w-4xl mx-auto transform hover:-translate-y-2">
      <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6">
        AI Cover Letter Magic
      </h3>

      {error && (
        <div className="bg-red-100/80 text-red-700 p-4 rounded-xl mb-6 border border-red-200 animate-pulse-once">
          {error}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <select
          value={form.tone}
          onChange={(e) => handleChange("tone", e.target.value)}
          className="w-full md:w-1/3 p-4 border-none rounded-xl bg-white/80 text-gray-700 font-medium focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg"
          disabled={isEditing || isLoading}
        >
          <option value="Formal">Formal</option>
          <option value="Conversational">Conversational</option>
          <option value="Bold">Bold</option>
        </select>

        <button
          onClick={generateLetter}
          className="w-full md:w-1/3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-4 rounded-xl shadow-lg hover:from-indigo-700 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isEditing || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-2 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0012 20v-4c-2.373 0-4-1.627-4-3.627h-2z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Letter"
          )}
        </button>

        <button
          onClick={toggleEdit}
          className="w-full md:w-1/3 bg-blue-500 text-white font-semibold py-4 rounded-xl shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          {isEditing ? "Save & View" : "Edit Letter"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-2">
              Recipient
            </label>
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => handleChange("recipient", e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="e.g., Hiring Manager"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={form.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-2">
              Company
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md"
              placeholder="e.g., TechCorp"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-2">
              Introduction
            </label>
            <textarea
              value={form.intro}
              onChange={(e) => handleChange("intro", e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md h-24"
              placeholder="e.g., I’m excited to apply for the role at..."
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-2">
              Skills
            </label>
            <textarea
              value={form.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md h-24"
              placeholder="e.g., I bring expertise in React, TypeScript..."
            />
          </div>
          <div>
            <label className="block text-gray-800 text-lg font-semibold mb-2">
              Closing
            </label>
            <textarea
              value={form.closing}
              onChange={(e) => handleChange("closing", e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all duration-300 shadow-sm hover:shadow-md h-24"
              placeholder="e.g., I’d love to discuss how I can contribute..."
            />
          </div>
        </div>
      ) : (
        <div className="relative">
          <textarea
            value={fullLetter}
            readOnly
            className="w-full mt-6 p-6 border border-gray-200 rounded-xl bg-gray-50/80 text-gray-800 font-medium focus:outline-none transition-all duration-300 shadow-md hover:shadow-lg h-64 md:h-80 resize-none"
          />
          <button
            onClick={handleDownload}
            className="mt-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 absolute top-2 right-2"
          >
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGen;
