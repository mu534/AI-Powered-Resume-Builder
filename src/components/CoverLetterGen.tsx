import React, { useState } from "react";
import { CoverLetter } from "../types";

const CoverLetterGen: React.FC = () => {
  const [tone, setTone] = useState<CoverLetter["tone"]>("Conversational");
  const [letter, setLetter] = useState<string>(
    "Dear Hiring Manager,\nI’m excited to apply for the Frontend Developer role..."
  );

  const generateLetter = () => {
    setLetter(
      `Dear Hiring Manager,\nI’m thrilled to apply with a ${tone.toLowerCase()} tone... (AI-generated content here)`
    );
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-indigo-900 mb-4">
        AI Cover Letter Magic
      </h3>
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value as CoverLetter["tone"])}
        className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      >
        <option value="Formal">Formal</option>
        <option value="Conversational">Conversational</option>
        <option value="Bold">Bold</option>
      </select>
      <button
        onClick={generateLetter}
        className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all"
      >
        Generate Letter
      </button>
      <textarea
        value={letter}
        onChange={(e) => setLetter(e.target.value)}
        className="w-full mt-4 p-3 border rounded-lg h-40 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>
  );
};

export default CoverLetterGen;
