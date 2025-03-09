import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import ResumePreview from "../components/ResumePreview";
import "font-awesome/css/font-awesome.min.css";
import { PersonalDetails } from "../types";

const ResumeHome: React.FC = () => {
  const [searchParams] = useSearchParams();
  const resumeTitle = searchParams.get("title") || "Untitled Resume";
  const navigate = useNavigate();

  // State for personal details form
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails>({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    phone: "",
    email: "",
  });

  // State for theme color selection
  const [themeColor, setThemeColor] = useState("#9333ea"); // Default purple
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  // Color options for the theme
  const colorOptions = [
    { name: "Purple", value: "#9333ea" },
    { name: "Blue", value: "#2563eb" },
    { name: "Green", value: "#10b981" },
    { name: "Red", value: "#ef4444" },
    { name: "Orange", value: "#f59e0b" },
  ];

  // Handle form input changes for personal details
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle "Next" navigation
  const handleNext = () => {
    console.log("Navigating to next step with:", personalDetails);
    // Navigate to the summary step with personalDetails and resumeTitle in state
    navigate("/resume-summary", { state: { personalDetails, resumeTitle } });
  };

  // Handle "Save" for personal details (optional, for now logs to console)
  const handleSave = () => {
    console.log("Saving personal details:", personalDetails);
    alert("Personal details saved successfully!");
  };

  // Handle theme selection
  const handleThemeSelect = (color: string) => {
    setThemeColor(color);
    setIsThemeModalOpen(false);
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4"
    >
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full z-10 top-0 fixed">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2"></div>
          <Link
            to="/"
            className="text-gray-600 hover:text-blue-600 transition duration-300"
          >
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-20 pb-12 px-4 flex-1 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8"
      >
        {/* Left Panel - Personal Details Form */}
        <motion.div
          variants={fadeIn}
          className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2 border border-gray-200"
          style={{ borderRadius: "10px", borderColor: themeColor }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Personal Details
            </h2>
            <div className="flex space-x-2">
              <button
                className="bg-purple-500 text-white p-2 rounded-full"
                onClick={() => setIsThemeModalOpen(true)}
              >
                <span className="text-lg">
                  <i className="fa fa-paint-brush"></i>
                </span>
              </button>
              <span className="text-sm text-purple-700">Theme</span>
            </div>
          </div>
          <p className="text-gray-600 mb-4">
            Get started with the basic information
          </p>
          <div className="space-y-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="firstName"
                value={personalDetails.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="text"
                name="lastName"
                value={personalDetails.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <input
              type="text"
              name="jobTitle"
              value={personalDetails.jobTitle}
              onChange={handleInputChange}
              placeholder="Job Title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              name="address"
              value={personalDetails.address}
              onChange={handleInputChange}
              placeholder="Address"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="flex gap-4">
              <input
                type="text"
                name="phone"
                value={personalDetails.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                name="email"
                value={personalDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
          <div className="mt-6 flex justify-between">
            <button
              onClick={handleSave}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
            >
              Save
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
            >
              Next →
            </button>
          </div>
        </motion.div>

        {/* Right Panel - Resume Preview */}
        <motion.div
          variants={fadeIn}
          className="w-full lg:w-1/2 bg-white p-6 rounded-lg shadow-lg border border-gray-200 mt-8 lg:mt-0"
          style={{
            borderRadius: "10px",
            borderColor: themeColor,
            borderTopWidth: "5px",
            borderBottomWidth: "1px",
          }}
        >
          <ResumePreview
            personalDetails={personalDetails}
            themeColor={themeColor}
            resumeTitle={resumeTitle}
            summary={""}
            experience={[]}
            fontSize={0}
            fontColor={""}
            education={[]}
            skills={[]}
          />
        </motion.div>
      </motion.div>

      {/* Theme Color Modal */}
      {isThemeModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full"
          >
            <h2 className="text-xl font-bold mb-4 text-gray-900">
              Select Theme Color
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {colorOptions.map((color) => (
                <button
                  key={color.value}
                  onClick={() => handleThemeSelect(color.value)}
                  className="w-12 h-12 rounded-full border-2 border-gray-300 hover:border-gray-500 focus:outline-none"
                  style={{ backgroundColor: color.value }}
                  aria-label={color.name}
                />
              ))}
            </div>
            <button
              onClick={() => setIsThemeModalOpen(false)}
              className="mt-4 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-all"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ResumeHome;
