import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // For theme icon
import { PersonalDetails } from "../types"; // Import from types.ts

const ResumeEditor: React.FC = () => {
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const resumeTitle = query.get("title") || "New Resume";

  const handleChange = (field: keyof PersonalDetails, value: string) => {
    setPersonalDetails((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("personalDetails", JSON.stringify(personalDetails));
    navigate("/resume-home", { state: { resumeTitle, personalDetails } });
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-white flex flex-col items-center justify-center"
    >
      {/* Navbar */}
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-2xl font-bold text-blue-600"
          >
            ResumeAI
          </motion.div>
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
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center"
      >
        <div className="max-w-4xl w-full space-y-6">
          <div className="flex justify-between items-center mb-4">
            <button className="bg-purple-500 text-white p-2 rounded-full flex items-center gap-2 hover:bg-purple-600 transition-all">
              <FaHome className="text-lg" /> Theme
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                navigate("/resume-home", {
                  state: { resumeTitle, personalDetails },
                })
              }
              className="bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-all"
            >
              Next →
            </motion.button>
          </div>

          <motion.div
            variants={slideUp}
            className="bg-white p-6 rounded-xl shadow-lg border border-purple-200"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Personal Detail
            </h2>
            <p className="text-gray-600 mb-4">
              Get started with the basic information
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={personalDetails.firstName}
                    onChange={(e) => handleChange("firstName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="First Name"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={personalDetails.lastName}
                    onChange={(e) => handleChange("lastName", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Job Title
                </label>
                <input
                  type="text"
                  value={personalDetails.jobTitle}
                  onChange={(e) => handleChange("jobTitle", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Job Title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={personalDetails.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Address"
                />
              </div>
              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <input
                    type="tel"
                    value={personalDetails.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Phone"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={personalDetails.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="mt-6 bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-600 transition-all"
            >
              Save
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeEditor;
