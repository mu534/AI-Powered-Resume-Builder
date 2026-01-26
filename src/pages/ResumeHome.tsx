import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "font-awesome/css/font-awesome.min.css";
import { PersonalDetails } from "../types";
import LivePreviewIcon from "../components/LivePreviewIcon";
import Button from "../Shared/components/Button";
import NavBar from "../components/NavBar";

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
  const handleBack = () => {
    navigate("/ResumeRoot", {});
  };

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

  // Handle theme color change
  const handleThemeChange = (color: string) => {
    setThemeColor(color);
  };

  // Save the current personal details into the saved resumes list

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      {/* Navbar */}
      <NavBar />

      <div className="fixed top-16 left-0 right-0  bg-white/80 backdrop-blur-md border-b border-gray-100 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-rgba(15,118,110,0.15)">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">
                1
              </div>
              <span className="font-semibold">Professional Experience</span>
            </div>
            <div className="flex-1 h-1 bg-gray-200 rounded-full mx-4">
              <div className="h-full w-1/6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"></div>
            </div>
            <span className="text-sm text-gray-500">Step 1 of 6</span>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 mt-12 flex-1 flex flex-col lg:flex-row items-start justify-center w-full max-w-6xl gap-8">
        {/* Left Panel - Personal Details Form */}
        <div className="w-full lg:w-1/2">
          <div
            className="bg-white p-6 rounded-xl shadow-md border"
            style={{ borderColor: themeColor }}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Personal Details
                </h2>
                <p className="text-sm text-gray-500">
                  Basic info used in header and contact
                </p>
              </div>
              <div className="flex items-center gap-2">
                {colorOptions.map((c) => (
                  <button
                    key={c.value}
                    onClick={() => handleThemeChange(c.value)}
                    className={`w-8 h-8 rounded-full border-2 ${themeColor === c.value ? "ring-2 ring-offset-2" : ""}`}
                    style={{ background: c.value }}
                    aria-label={`Select ${c.label}`}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                value={personalDetails.firstName}
                onChange={handleInputChange}
                placeholder="First Name"
                className="p-3 border border-gray-200 rounded-md focus:outline-none"
              />
              <input
                type="text"
                name="lastName"
                value={personalDetails.lastName}
                onChange={handleInputChange}
                placeholder="Last Name"
                className="p-3 border border-gray-200 rounded-md focus:outline-none"
              />

              <input
                type="text"
                name="address"
                value={personalDetails.address}
                onChange={handleInputChange}
                placeholder="Address"
                className="p-3 border border-gray-200 rounded-md focus:outline-none md:col-span-2"
              />
              <input
                type="text"
                name="phone"
                value={personalDetails.phone}
                onChange={handleInputChange}
                placeholder="Phone"
                className="p-3 border border-gray-200 rounded-md focus:outline-none"
              />
              <input
                type="email"
                name="email"
                value={personalDetails.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="p-3 border border-gray-200 rounded-md focus:outline-none"
              />
            </div>

            <div className="mt-6 flex items-center gap-3">
              <Button
                variant="secondary"
                onClick={handleBack}
                className="border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Back
              </Button>
              <Button
                onClick={handleNext}
                className="border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Next →
              </Button>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="w-full lg:w-1/2">
          <LivePreviewIcon />
          <div
            className="p-6 rounded-md"
            style={{ borderLeft: `6px solid ${themeColor}` }}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {personalDetails.firstName} {personalDetails.lastName}
                </h2>
                <p className="text-sm text-gray-600">
                  {personalDetails.jobTitle || resumeTitle}
                </p>
              </div>
              <div className="text-right text-sm text-gray-500">
                <div>{personalDetails.email}</div>
                <div>{personalDetails.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHome;
