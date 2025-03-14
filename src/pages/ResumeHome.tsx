import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
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

  // Color options for the theme
  const colorOptions = [
    { value: "#9333ea", label: "Purple" },
    { value: "#2563eb", label: "Blue" },
    { value: "#f59e0b", label: "Amber" },
  ];

  // Handle form input changes for personal details with debugging
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(`Updating ${name} with value: ${value}`); // Debug log
    setPersonalDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle "Next" navigation to summary
  const handleNext = () => {
    console.log("Navigating to next step with:", personalDetails);
    navigate("/resume-summary", { state: { personalDetails, resumeTitle } });
  };

  // Handle "Save" for personal details and navigate to preview
  const handleSave = () => {
    console.log("Saving personal details:", personalDetails);
    alert("Personal details saved successfully!");
    navigate("/resume-preview", { state: { personalDetails, resumeTitle } });
  };

  // Handle theme color change
  const handleThemeChange = (color: string) => {
    setThemeColor(color);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Navbar */}
      <nav className="bg-white shadow-md w-full z-10 top-0 fixed">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-end items-center">
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
      <div className="pt-20 pb-12 px-4 flex-1 flex flex-col lg:flex-row items-center justify-center w-full max-w-6xl gap-8">
        {/* Left Panel - Personal Details Form */}
        <div
          className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-1/2 border border-gray-200"
          style={{ borderColor: themeColor, borderRadius: "10px" }}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Personal Details
            </h2>
            <div className="flex items-center space-x-2">
              <button
                className="bg-gray-200 text-gray-700 p-2 rounded-full hover:bg-gray-300 transition-all"
                onClick={() =>
                  handleThemeChange(
                    colorOptions[
                      Math.floor(Math.random() * colorOptions.length)
                    ].value
                  )
                }
              >
                <i className="fa fa-paint-brush text-lg"></i>
              </button>
              <span className="text-sm text-gray-700">Theme</span>
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
              Save & Preview
            </button>
            <button
              onClick={handleNext}
              className="bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-all"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHome;
