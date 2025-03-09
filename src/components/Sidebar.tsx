import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaCog,
  FaRocket,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaUser,
  FaChartBar,
  FaMoon,
  FaSun,
} from "react-icons/fa";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    profileImage: string | null;
  }>({
    name: "ResumeAI",
    email: "Example@example.com",
    profileImage: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Fetch profile data from localStorage on component mount
  useEffect(() => {
    const savedProfile = localStorage.getItem("profile");
    if (savedProfile) {
      const { name, profileImage } = JSON.parse(savedProfile);
      setProfile((prev) => ({
        ...prev,
        name,
        profileImage,
      }));
    }
    setIsLoading(false);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-3 z-50 p-2 bg-blue-900 text-white rounded-lg shadow-lg"
        aria-label="Toggle Sidebar"
      >
        {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      <div
        className={`fixed lg:relative w-64 bg-gradient-to-b from-blue-900 to-indigo-800 text-white p-6 flex flex-col h-screen shadow-lg transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } z-40`}
      >
        <h2 className="text-3xl font-extrabold tracking-tight mb-8 flex items-center gap-2">
          <FaRocket /> Career Boost
        </h2>

        {/* Profile Section */}
        <div className="flex items-center gap-3 mb-6 p-4 bg-indigo-700 rounded-lg hover:bg-indigo-600 transition-all duration-200">
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center overflow-hidden">
            {isLoading ? (
              <div className=" animate-pulse bg-gray-500 w-full h-full"></div>
            ) : profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt="Profile"
                className="w-full h-full  object-cover"
              />
            ) : (
              <FaUser size={32} />
            )}
          </div>
          <div>
            <p className="text-lg font-semibold">
              {isLoading ? "Loading..." : profile.name}
            </p>
            <p className="text-sm opacity-75">
              {isLoading ? "loading@example.com" : profile.email}
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <Link
            to="/dashboard"
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaHome /> Dashboard
          </Link>
          <Link
            to="/profile"
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/analytics"
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaChartBar /> Analytics
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaCog /> Settings
          </Link>
        </nav>

        {/* Theme Toggle */}
        <button
          onClick={toggleDarkMode}
          className="mt-6 flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-gray-700 transition-all duration-200"
        >
          {isDarkMode ? <FaSun /> : <FaMoon />}
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="mt-auto flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
        >
          <FaSignOutAlt /> Logout
        </button>

        {/* Footer */}
        <div className="mt-4 text-sm opacity-75">
          v1.0 - Powered by NATIVE-X
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
