import React from "react";

type LoadingSkeletonProps = {
  lines?: number;
};

const AISkeleton: React.FC<LoadingSkeletonProps> = ({ lines = 3 }) => {
  return (
    <div className="space-y-2 animate-pulse">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-4 w-full rounded bg-gray-300" />
      ))}
    </div>
  );
};

export default AISkeleton;
