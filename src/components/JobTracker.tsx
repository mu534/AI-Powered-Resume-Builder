import React from "react";
import { motion } from "framer-motion";
import { Job } from "../types";

const jobs: Job[] = [
  {
    id: "j1",
    title: "Frontend Dev",
    company: "TechBit",
    description: "React & TS",
    status: "Applied",
    matchScore: 92,
    appliedDate: "2025-03-01",
  },
  {
    id: "j2",
    title: "Designer",
    company: "CreativeLabs",
    description: "UI/UX",
    status: "Interview",
    matchScore: 85,
    appliedDate: "2025-02-28",
  },
];

const JobTracker: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold text-indigo-900 mb-4">
        Your Job Journey
      </h3>
      <div className="space-y-4">
        {jobs.map((job) => (
          <motion.div
            key={job.id}
            whileHover={{ scale: 1.02 }}
            className="p-4 border rounded-lg hover:bg-gray-50 transition-all"
          >
            <h4 className="font-semibold text-lg text-gray-800">
              {job.title} - {job.company}
            </h4>
            <p className="text-sm text-gray-600">{job.description}</p>
            <div className="mt-2 flex justify-between items-center">
              <span
                className={`px-2 py-1 rounded-full text-sm font-medium ${
                  job.status === "Interview"
                    ? "bg-yellow-200 text-yellow-800"
                    : "bg-blue-200 text-blue-800"
                }`}
              >
                {job.status}
              </span>
              <div className="w-1/2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${job.matchScore}%` }}
                  ></div>
                </div>
                <p className="text-sm font-medium text-gray-800 mt-1">
                  {job.matchScore}% Match
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default JobTracker;
