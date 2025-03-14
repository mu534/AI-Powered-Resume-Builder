import { Link } from "react-router-dom";
import CoverLetterGen from "../components/CoverLetterGen";
import Footer from "../components/Footer";
import AboutResumeAI from "../components/AboutResumeAI.tsx"; // Import the new component

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-lg fixed w-full z-10 top-0  pr-10">
        <div className="max-w-6xl  mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end ">
          <Link to="/ResumeRoot">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
              Go to Resume Editor
            </button>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 min-h-screen">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Heading */}
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ResumeAI
              </span>
            </h1>
            <p className="mt-4 text-xl text-gray-600">
              Craft Your Perfect Resume with AI Precision
            </p>
          </div>

          {/* About ResumeAI Section */}
          <AboutResumeAI />

          {/* Cover Letter Generator */}
          <div className="rounded-2xl shadow-lg bg-white p-6">
            <CoverLetterGen />
          </div>

          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
