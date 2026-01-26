import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import SavedResumeCard from "./SavedResumeCard";
import { Resume } from "../types";
import { useAppContext } from "../AppContext";

const COVER_IMAGES = [
  "https://source.unsplash.com/400x250/?document,resume",
  "https://source.unsplash.com/400x250/?cv,document",
  "https://source.unsplash.com/400x250/?business,profile",
  "https://source.unsplash.com/400x250/?office,work",
];

const ResumeRoot: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newResumeTitle, setNewResumeTitle] = useState("");
  const [query, setQuery] = useState("");
  const [savedResumes, setSavedResumes] = useState<Resume[]>([]);
  const navigate = useNavigate();
  const context = useAppContext();

  useEffect(() => {
    const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    setSavedResumes(resumes);
  }, []);

  useEffect(() => {
    const onStorage = () => {
      const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
      setSavedResumes(resumes);
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return savedResumes;
    return savedResumes.filter((r) =>
      r.name.toLowerCase().includes(query.trim().toLowerCase()),
    );
  }, [savedResumes, query]);

  const handleCreateResume = () => {
    if (!newResumeTitle.trim()) return;

    const randomImage =
      COVER_IMAGES[Math.floor(Math.random() * COVER_IMAGES.length)];

    const newResume: Resume = {
      name: newResumeTitle,
      createdAt: new Date().toISOString(),
      coverImage: randomImage,
      content: {
        personal: {
          name: "",
          email: "",
          phone: "",
          summary: "",
        },
        experience: [],
        education: [],
        skills: [],
      },
    };

    const next = [newResume, ...savedResumes];
    localStorage.setItem("resumes", JSON.stringify(next));
    setSavedResumes(next);
    navigate(`/ResumeHome?title=${encodeURIComponent(newResumeTitle)}`);
    setIsModalOpen(false);
    setNewResumeTitle("");
  };

  const handleDelete = (index: number) => {
    const next = savedResumes.filter((_, i) => i !== index);
    localStorage.setItem("resumes", JSON.stringify(next));
    setSavedResumes(next);
  };

  const handleEdit = (title: string) => {
    navigate(`/ResumeHome?title=${encodeURIComponent(title)}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-center items-center">
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Home
            </Link>
            <Link
              to="/settings"
              className="text-gray-600 hover:text-blue-600 transition"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 flex-1 flex items-start justify-center w-full">
        <div className="max-w-7xl w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900">
                My Resumes
              </h1>
              <p className="text-sm text-gray-500">
                Manage and create resumes quickly
              </p>
            </div>

            <div className="flex items-center gap-3">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search resumes..."
                className="px-3 py-2 border border-gray-200 rounded-md shadow-sm w-64"
              />
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg shadow hover:opacity-95"
              >
                + New Resume
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div
              onClick={() => setIsModalOpen(true)}
              className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center h-56 cursor-pointer hover:bg-gray-50 transition"
            >
              <div className="text-4xl text-gray-400 mb-2">+</div>
              <div className="text-lg font-semibold">Create a new resume</div>
            </div>

            {filtered.map((resume, idx) => (
              <div key={idx} className="relative">
                <SavedResumeCard
                  title={resume.name}
                  createdAt={resume.createdAt}
                  index={idx + 1}
                  content={resume.content}
                  coverImage={resume.coverImage}
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(resume.name)}
                    className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="bg-red-500 text-white p-2 rounded-full shadow hover:opacity-90"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && savedResumes.length === 0 && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">
                  No resumes yet — create one to get started.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                Create New Resume
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <input
              type="text"
              value={newResumeTitle}
              onChange={(e) => setNewResumeTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="e.g., Full Stack Resume"
            />
            <div className="flex gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateResume}
                className="flex-1 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600"
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
