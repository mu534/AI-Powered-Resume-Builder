import React from "react";
import { ResumeContent } from "../types";

interface SavedResumeCardProps {
  title: string;
  createdAt: string;
  index: number;
  content: ResumeContent;
  coverImage: string;
}

const SavedResumeCard: React.FC<SavedResumeCardProps> = ({
  title,
  createdAt,
  coverImage,
}) => {
  return (
    <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer">
      {/* Cover Image with fallback */}
      <div className="relative w-full h-32 sm:h-48 bg-gray-200">
        <img
          src={coverImage}
          alt={title || "Resume Cover"}
          className="w-full h-full object-cover"
          onError={(e) => {
            // fallback image if Picsum fails
            (e.target as HTMLImageElement).src =
              `https://picsum.photos/400/250?random=${Date.now()}`;
          }}
        />
      </div>

      {/* Card Content */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-lg truncate">
          {title || "Untitled Resume"}
        </h3>
        <p className="text-sm text-gray-500">
          Created: {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default SavedResumeCard;
