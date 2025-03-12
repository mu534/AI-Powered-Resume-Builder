import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import SavedResumeCard from "./SavedResumeCard";
import { useAppContext } from "../AppContext"; // Adjust path if needed

interface Resume {
  title: string;
  createdAt: string;
}

const ResumeRoot: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();

  // Debug: Check if context is available
  const context = useAppContext();
  console.log("ResumeRoot: Context available:", context);

  // Load saved resumes from localStorage on component mount
  useEffect(() => {
    const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    setSavedResumes(resumes);
  }, []);

  const handleCreateResume = () => {
    if (newResumeTitle.trim()) {
      console.log("Creating resume with title:", newResumeTitle);
      navigate(`/ResumeHome?title=${encodeURIComponent(newResumeTitle)}`);
      setIsModalOpen(false);
      setNewResumeTitle("");
    } else {
      console.log("Resume title is empty or invalid");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("Input value changing to:", e.target.value);
    setNewResumeTitle(e.target.value);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Home
            </Link>
            <Link
              to="/settings"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center">
        <div className="max-w-4xl w-full space-y-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            My Resume
          </h1>
          <p className="text-xl text-gray-600">
            Start Creating AI Resume to your next job role
          </p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Start Creating Card */}
            <div
              onClick={() => setIsModalOpen(true)}
              className="bg-gray-100 p-6 rounded-3xl shadow-md cursor-pointer flex flex-col items-center justify-center h-64 hover:bg-gray-200 transition-all"
            >
              <span className="text-4xl text-gray-500 mb-4">+</span>
              <p className="text-lg font-medium text-gray-700">
                Start Creating
              </p>
            </div>

            {/* Saved Resumes */}
            {savedResumes.map((resume, index) => (
              <SavedResumeCard
                key={index}
                title={resume.title}
                createdAt={resume.createdAt}
                index={index + 1}
                content={""}
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm">
            Select a resume or job role to begin your journey with ResumeAI.
          </p>
        </div>
      </div>

      {/* Create New Resume Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Resume
              </h2>
              <button
                onClick={() => {
                  console.log("Modal closed, title was:", newResumeTitle);
                  setIsModalOpen(false);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <p className="text-gray-600 mb-4">
              Add a title for your new resume
            </p>
            <input
              type="text"
              value={newResumeTitle}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Full Stack Resume"
              aria-label="New resume title"
            />
            <div className="flex gap-4">
              <button
                onClick={() => {
                  console.log("Cancel clicked, title was:", newResumeTitle);
                  setIsModalOpen(false);
                  setNewResumeTitle("");
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateResume}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
                disabled={!newResumeTitle.trim()}
                aria-label="Create new resume"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeRoot;
