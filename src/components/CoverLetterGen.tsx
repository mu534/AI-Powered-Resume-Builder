import React, { useState } from "react";
import Card from "../Shared/components/Card";
import { generateResume } from "../services/aiService";
import CoverLetterControls from "./CoverLetterControls";
import CoverLetterEditor from "./CoverLetterEditor";
import { CoverLetterForm } from "../types/coverLetter";

const CoverLetterGen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<CoverLetterForm>({
    recipient: "Hiring Manager",
    jobTitle: "Frontend Developer",
    company: "TechCorp",
    intro: "",
    skills: "",
    closing: "",
    tone: "Conversational",
  });

  const handleChange = (field: keyof CoverLetterForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const generateLetter = async () => {
    if (!form.jobTitle || !form.company) {
      setError("Please provide a valid job title and company.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const prompt = `Generate a professional cover letter for a ${form.jobTitle} position at ${form.company}. Address to ${form.recipient}. Use a ${form.tone.toLowerCase()} tone.`;

      const result = await generateResume({ prompt });

      if (typeof result === "string") {
        const [intro = "", skills = "", closing = ""] = result.split("\n\n");
        setForm((prev) => ({
          ...prev,
          intro,
          skills,
          closing,
        }));
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to generate cover letter. Please try again.";
      console.error("Error generating cover letter:", err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const fullLetter = `Dear ${form.recipient},\n\n${form.intro}\n\n${form.skills}\n\n${form.closing}\n\nSincerely,\n[Your Name]`;

  const handleDownload = () => {
    const blob = new Blob([fullLetter], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `cover_letter_${form.jobTitle}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-2">AI Cover Letter</h3>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}

      <CoverLetterControls
        tone={form.tone}
        isEditing={isEditing}
        isLoading={isLoading}
        onToneChange={(tone) => handleChange("tone", tone)}
        onGenerate={generateLetter}
        onToggleEdit={() => setIsEditing((v) => !v)}
      />

      <CoverLetterEditor
        isEditing={isEditing}
        form={form}
        fullLetter={fullLetter}
        onChange={handleChange}
        onDownload={handleDownload}
      />
    </Card>
  );
};

export default CoverLetterGen;
