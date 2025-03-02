import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Template } from "../types";

const templates: Template[] = [
  {
    id: "t1",
    name: "Sleek Modern",
    preview: "/modern.png",
    styles: {
      bg: "bg-gray-100",
      text: "text-gray-900",
      accent: "border-indigo-500",
    },
  },
  {
    id: "t2",
    name: "Bold Creative",
    preview: "/creative.png",
    styles: {
      bg: "bg-blue-100",
      text: "text-blue-900",
      accent: "border-blue-500",
    },
  },
  {
    id: "t3",
    name: "Classic Professional",
    preview: "/classic.png",
    styles: { bg: "bg-white", text: "text-black", accent: "border-gray-500" },
  },
];

const TemplatePicker: React.FC<{ onSelect: (templateId: string) => void }> = ({
  onSelect,
}) => {
  const [selected, setSelected] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (templateId: string) => {
    setSelected(templateId);
    onSelect(templateId);
    navigate("/"); // Redirect back to Dashboard after selection
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 text-center">
        Choose Your Resume Style
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            onClick={() => handleSelect(template.id)}
            className={`p-6 rounded-xl shadow-lg cursor-pointer ${
              template.styles.bg
            } ${template.styles.text} ${
              selected === template.id
                ? `${template.styles.accent} border-4`
                : "border"
            } hover:shadow-xl transition-all duration-300`}
          >
            <img
              src={template.preview}
              alt={template.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="text-xl font-semibold text-center">
              {template.name}
            </h3>
            <p className="text-sm text-center mt-2 opacity-75">
              Click to select this style
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => navigate("/")}
        className="mt-8 w-full max-w-xs mx-auto block bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all"
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default TemplatePicker;
