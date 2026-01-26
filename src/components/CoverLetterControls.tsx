import React from "react";
import Button from "../Shared/components/Button";
import { CoverLetterTone } from "../types/coverLetter";

interface CoverLetterControlsProps {
  tone: CoverLetterTone;
  isEditing: boolean;
  isLoading: boolean;
  onToneChange: (tone: CoverLetterTone) => void;
  onGenerate: () => void;
  onToggleEdit: () => void;
}

const CoverLetterControls: React.FC<CoverLetterControlsProps> = ({
  tone,
  isEditing,
  isLoading,
  onToneChange,
  onGenerate,
  onToggleEdit,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
      <select
        value={tone}
        onChange={(e) => onToneChange(e.target.value as CoverLetterTone)}
        disabled={isEditing || isLoading}
        className="p-3 rounded-md border border-gray-200 bg-white text-gray-700"
      >
        <option value="Formal">Formal</option>
        <option value="Conversational">Conversational</option>
        <option value="Bold">Bold</option>
      </select>

      <Button
        onClick={onGenerate}
        disabled={isLoading || isEditing}
        className="w-full"
      >
        {isLoading ? "Generating…" : "Generate Letter"}
      </Button>

      <Button
        variant="secondary"
        onClick={onToggleEdit}
        disabled={isLoading}
        className="w-full"
      >
        {isEditing ? "Save & View" : "Edit Letter"}
      </Button>
    </div>
  );
};

export default CoverLetterControls;
