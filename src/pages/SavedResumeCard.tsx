import React from "react";
import { Link } from "react-router-dom";
import { SavedResumeCardProps } from "../types/index";

const SavedResumeCard: React.FC<SavedResumeCardProps> = ({
  title,
  createdAt,
  index,
  content,
}) => {
  return (
    <Link to={`/resume-editor?title=${encodeURIComponent(title)}`}>
      <div className="bg-gradient-to-br from-blue-200 to-blue-400 p-6 rounded-3xl shadow-md cursor-pointer flex flex-col items-center justify-center h-64">
        <img
          src="/resume-icon.png"
          alt="Resume Icon"
          className="w-24 h-24 mb-4"
        />
        <p className="text-lg font-medium text-white">{title}</p>
        <span className="mt-2 text-sm font-semibold text-white bg-blue-600 rounded-full px-3 py-1">
          #{index} - Created on {new Date(createdAt).toLocaleDateString()}
        </span>

        {content && <div className="mt-4 text-white text-sm">{content}</div>}
      </div>
    </Link>
  );
};

export default SavedResumeCard;
