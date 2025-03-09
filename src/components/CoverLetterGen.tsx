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

  // Function to download the cover letter
  const downloadLetter = () => {
    const blob = new Blob([fullLetter], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "cover-letter.txt";
    link.click();
  };

  return (
    <div className="p-4 md:px-40 md:py-6 rounded-xl">
      <h3 className="text-lg md:text-2xl font-bold text-indigo-900 mb-4">
        AI Cover Letter Magic
      </h3>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <select
        value={form.tone}
        onChange={(e) => handleChange("tone", e.target.value)}
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
        disabled={isEditing || isLoading}
      >
        <option value="Formal">Formal</option>
        <option value="Conversational">Conversational</option>
        <option value="Bold">Bold</option>
      </select>

      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <button
          onClick={generateLetter}
          className="w-full md:flex-1 bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all disabled:bg-indigo-400"
          disabled={isEditing || isLoading}
        >
          {isLoading ? "Generating..." : "Generate Letter"}
        </button>
        <button
          onClick={toggleEdit}
          className="w-full md:flex-1 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-all disabled:bg-blue-400"
          disabled={isLoading}
        >
          {isEditing ? "Save & View" : "Edit Letter"}
        </button>
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Recipient
            </label>
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => handleChange("recipient", e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="e.g., Hiring Manager"
            />
          </div>
        </div>
      ) : (
        <textarea
          value={fullLetter}
          readOnly
          className="w-full mt-4 p-3 border rounded-lg h-48 md:h-40 bg-gray-50 text-gray-700 focus:outline-none"
        />
      )}

      {/* Download Button */}
      {!isEditing && !isLoading && (
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={downloadLetter}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all"
          >
            Download Cover Letter
          </button>
        </div>
      )}
    </div>
  );
};

export default CoverLetterGen;
