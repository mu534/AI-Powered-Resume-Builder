import React, { useState } from "react";
import { CoverLetter } from "../types/";
import { generateResume } from "../services/aiService";
import Button from "../Shared/components/Button";
import Card from "../Shared/components/Card";

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

  // We'll use the server-side AI route via `generateResume` for content generation.

  const generateLetter = async () => {
    if (!form.jobTitle || !form.company) {
      setError("Please provide a valid job title and company.");
      return;
    }
    // basic validation
    if (!form.jobTitle || !form.company) {
      setError("Please provide a valid job title and company.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `Generate a professional cover letter for a ${form.jobTitle} position at ${form.company}. Address to ${form.recipient}. Include an introduction (1-2 sentences), a skills paragraph (2-3 sentences), and a concise closing (1 sentence). Use a ${form.tone.toLowerCase()} tone. Return plain text with paragraph breaks.`;
      const result = await generateResume({ prompt });
      const aiResponse = (result as any).text || String(result);
      if (aiResponse) {
        const [intro = "", skills = "", closing = ""] =
          aiResponse.split("\n\n");
        setForm((prev) => ({
          ...prev,
          intro: intro.trim() || prev.intro,
          skills: skills.trim() || prev.skills,
          closing: closing.trim() || prev.closing,
        }));
      } else {
        throw new Error("AI response was empty or invalid.");
      }
    } catch (err) {
      console.error("Error generating cover letter:", err);
      setError(
        err instanceof Error ? err.message : "Failed to generate cover letter.",
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
    <Card className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h3 className="text-2xl font-semibold text-gray-900 mb-2">
          AI Cover Letter
        </h3>
        <p className="text-sm text-gray-600">
          Generate a concise, recruiter-friendly cover letter tailored to the
          role.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <select
          value={form.tone}
          onChange={(e) => handleChange("tone", e.target.value)}
          className="p-3 rounded-md border border-gray-200 bg-white text-gray-700"
          aria-label="Tone"
          disabled={isEditing || isLoading}
        >
          <option value="Formal">Formal</option>
          <option value="Conversational">Conversational</option>
          <option value="Bold">Bold</option>
        </select>

        <Button
          onClick={generateLetter}
          disabled={isLoading || isEditing}
          className="w-full"
        >
          {isLoading ? "Generating…" : "Generate Letter"}
        </Button>

        <Button
          variant="secondary"
          onClick={toggleEdit}
          disabled={isLoading}
          className="w-full"
        >
          {isEditing ? "Save & View" : "Edit Letter"}
        </Button>
      </div>

      {isEditing ? (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Recipient
            </label>
            <input
              type="text"
              value={form.recipient}
              onChange={(e) => handleChange("recipient", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              placeholder="e.g., Hiring Manager"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Job Title
            </label>
            <input
              type="text"
              value={form.jobTitle}
              onChange={(e) => handleChange("jobTitle", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Company
            </label>
            <input
              type="text"
              value={form.company}
              onChange={(e) => handleChange("company", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm"
              placeholder="e.g., TechCorp"
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Introduction
            </label>
            <textarea
              value={form.intro}
              onChange={(e) => handleChange("intro", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm h-24"
              placeholder="e.g., I’m excited to apply for the role at..."
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Skills
            </label>
            <textarea
              value={form.skills}
              onChange={(e) => handleChange("skills", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm h-24"
              placeholder="e.g., I bring expertise in React, TypeScript..."
            />
          </div>
          <div>
            <label className="block text-gray-800 text-sm font-medium mb-2">
              Closing
            </label>
            <textarea
              value={form.closing}
              onChange={(e) => handleChange("closing", e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-md bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none shadow-sm h-24"
              placeholder="e.g., I’d love to discuss how I can contribute..."
            />
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={fullLetter}
            readOnly
            className="w-full mt-4 p-4 border border-gray-200 rounded-md bg-gray-50 text-gray-800 h-60 resize-none"
          />
          <div className="flex justify-end mt-3">
            <Button onClick={handleDownload}>Download</Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default CoverLetterGen;
