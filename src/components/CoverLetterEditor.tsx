import React from "react";
import Button from "../Shared/components/Button";
import { CoverLetterForm } from "../types/coverLetter";

interface CoverLetterEditorProps {
  isEditing: boolean;
  form: CoverLetterForm;
  fullLetter: string;
  onChange: (field: keyof CoverLetterForm, value: string) => void;
  onDownload: () => void;
}

const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({
  isEditing,
  form,
  fullLetter,
  onChange,
  onDownload,
}) => {
  if (isEditing) {
    return (
      <div className="space-y-6">
        {(
          [
            { label: "Recipient", field: "recipient" },
            { label: "Job Title", field: "jobTitle" },
            { label: "Company", field: "company" },
          ] as const
        ).map(({ label, field }) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <input
              value={form[field]}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full p-3 border rounded-md"
            />
          </div>
        ))}

        {(
          [
            { label: "Introduction", field: "intro" },
            { label: "Skills", field: "skills" },
            { label: "Closing", field: "closing" },
          ] as const
        ).map(({ label, field }) => (
          <div key={field}>
            <label className="block text-sm font-medium mb-2">{label}</label>
            <textarea
              value={form[field]}
              onChange={(e) => onChange(field, e.target.value)}
              className="w-full p-3 border rounded-md h-24"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div>
      <textarea
        value={fullLetter}
        readOnly
        className="w-full mt-4 p-4 border rounded-md bg-gray-50 h-60"
      />
      <div className="flex justify-end mt-3">
        <Button onClick={onDownload}>Download</Button>
      </div>
    </div>
  );
};

export default CoverLetterEditor;
