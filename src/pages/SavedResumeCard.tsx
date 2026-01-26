import React from "react";
import { ResumeContent } from "../types";

interface SavedResumeCardProps {
  title: string;
  createdAt: string;
  index: number;
  content: ResumeContent;
  coverImage?: string;
}

const SavedResumeCard: React.FC<SavedResumeCardProps> = ({
  title,
  createdAt,
  coverImage,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition cursor-pointer">
      {coverImage && (
        <img
          src={coverImage}
          alt={title}
          className="w-full h-32 object-cover"
        />
      )}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg">{title}</h3>
        <p className="text-sm text-gray-500">
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SavedResumeCard;
