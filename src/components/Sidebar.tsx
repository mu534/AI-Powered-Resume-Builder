import React from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCog, FaRocket, FaSignOutAlt } from "react-icons/fa";

// Define props interface explicitly
interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  return (
    <div className="w-64 bg-gradient-to-b from-blue-900 to-indigo-800 text-white p-6 flex flex-col h-screen shadow-lg">
      <h2 className="text-3xl font-extrabold tracking-tight mb-8 flex items-center gap-2">
        <FaRocket /> Career Boost
      </h2>
      <nav className="space-y-4">
        <Link
          to="/"
          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200"
        >
          <FaHome /> Dashboard
        </Link>
        <Link
          to="/settings"
          className="flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-indigo-600 transition-all duration-200"
        >
          <FaCog /> Settings
        </Link>
      </nav>
      <button
        onClick={onLogout}
        className="mt-auto flex items-center gap-3 py-3 px-4 rounded-lg hover:bg-red-600 transition-all duration-200"
      >
        <FaSignOutAlt /> Logout
      </button>
      <div className="mt-4 text-sm opacity-75">v1.0 - Powered by xAI</div>
    </div>
  );
};

export default Sidebar;
