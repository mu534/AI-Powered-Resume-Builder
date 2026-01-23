import { useState, useEffect } from "react";
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

  // Load an existing resume if the title matches a saved one
  useEffect(() => {
    const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const found = resumes.find((r: any) => r.name === resumeTitle);
    if (found?.content?.personal) {
      setPersonalDetails((prev) => ({ ...prev, ...found.content.personal }));
    }
  }, [resumeTitle]);

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

  // Save the current personal details into the saved resumes list
  const saveToLocal = () => {
    const resumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const idx = resumes.findIndex((r: any) => r.name === resumeTitle);
    const updated = {
      name: resumeTitle,
      createdAt: idx === -1 ? Date.now() : resumes[idx].createdAt,
      content: {
        personal: personalDetails,
        experience: resumes[idx]?.content?.experience || [],
        education: resumes[idx]?.content?.education || [],
        skills: resumes[idx]?.content?.skills || [],
      },
    };
    if (idx === -1) resumes.unshift(updated);
    else resumes[idx] = updated;
    localStorage.setItem("resumes", JSON.stringify(resumes));
    alert("Saved locally");
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
      <div className="pt-24 pb-12 px-4 flex-1 flex flex-col lg:flex-row items-start justify-center w-full max-w-6xl gap-8">
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
                name="jobTitle"
                value={personalDetails.jobTitle}
                onChange={handleInputChange}
                placeholder="Job Title"
                className="p-3 border border-gray-200 rounded-md focus:outline-none md:col-span-2"
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
              <button
                onClick={() => {
                  saveToLocal();
                  handleSave();
                }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-md shadow"
              >
                Save & Preview
              </button>
              <button
                onClick={handleNext}
                className="border border-gray-200 px-4 py-2 rounded-md hover:bg-gray-50"
              >
                Next →
              </button>
              <button
                onClick={saveToLocal}
                className="ml-auto text-sm text-gray-500 underline"
              >
                Save locally
              </button>
            </div>
          </div>
        </div>

        {/* Right Panel - Live Preview */}
        <div className="w-full lg:w-1/2">
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-3">
              Live Preview
            </h3>
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

              <div className="mt-4 text-gray-700">
                <p className="italic text-sm">
                  {personalDetails.summary ||
                    "Add a short professional summary to highlight your strengths."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeHome;
