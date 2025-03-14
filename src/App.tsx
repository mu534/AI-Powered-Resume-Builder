import React from "react";
import { Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

import Sidebar from "./components/Sidebar";
import ResumeRoot from "./pages/ResumeRoot";
import ResumeHome from "./pages/ResumeHome";
import ResumeSummary from "./pages/ResumeSummary";
import ResumeExperience from "./pages/ResumeExperience";
import ResumeEducation from "./pages/ResumeEducation";
import ResumeFinal from "./pages/ResumeFinal";
import ResumeSkills from "./pages/ResumeSkills";
import Profile from "./pages/Profile";
import { useAppContext } from "./AppContext";

const CareerLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  console.log("CareerLayout rendering at:", new Date().toISOString());

  const { isAuthenticated, setIsAuthenticated } = useAppContext();
  console.log(
    "CareerLayout: Context accessed at:",
    new Date().toISOString(),
    "isAuthenticated:",
    isAuthenticated
  );

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar onLogout={handleLogout} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId="598605355815-0fi7891f8fvr04ur6hcjuv7qrld1c5gp.apps.googleusercontent.com">
      <Routes>
        <Route
          path="/"
          element={
            <CareerLayout>
              <Dashboard />
            </CareerLayout>
          }
        />
        <Route
          path="/ResumeRoot"
          element={
            <CareerLayout>
              <ResumeRoot />
            </CareerLayout>
          }
        />
        <Route
          path="/ResumeHome"
          element={
            <CareerLayout>
              <ResumeHome />
            </CareerLayout>
          }
        />
        <Route
          path="/resume-summary"
          element={
            <CareerLayout>
              <ResumeSummary />
            </CareerLayout>
          }
        />
        <Route
          path="/resume-experience"
          element={
            <CareerLayout>
              <ResumeExperience />
            </CareerLayout>
          }
        />
        <Route
          path="/resume-education"
          element={
            <CareerLayout>
              <ResumeEducation />
            </CareerLayout>
          }
        />
        <Route
          path="/resume-skills"
          element={
            <CareerLayout>
              <ResumeSkills />
            </CareerLayout>
          }
        />
        <Route
          path="/resume-final"
          element={
            <CareerLayout>
              <ResumeFinal />
            </CareerLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <CareerLayout>
              <Profile />
            </CareerLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <CareerLayout>
              <Settings />
            </CareerLayout>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
