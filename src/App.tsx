import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Resume from "./components/Resume";
import SignIn from "./HomePage/Signin";
import SignUp from "./HomePage/SignUp ";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import TemplatePicker from "./pages/TemplatePicker";
import Sidebar from "./components/Sidebar";

// Auth Layout for SignIn and SignUp
const AuthLayout: React.FC<{ children: React.ReactNode; title: string }> = ({
  children,
  title,
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-gray-100 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full transform hover:scale-105 transition-all duration-300">
        <h1 className="text-3xl font-extrabold text-indigo-900 mb-6 text-center">
          {title}
        </h1>
        {children}
        <p className="mt-4 text-center text-sm text-gray-600">
          Powered by <span className="font-semibold text-indigo-600">xAI</span>
        </p>
      </div>
    </div>
  );
};

// Career Layout with Sidebar and Auth Check
const CareerLayout: React.FC<{
  children: React.ReactNode;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ children, isAuthenticated, setIsAuthenticated }) => {
  if (!isAuthenticated) return <Navigate to="/signin" replace />;

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
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("authToken")
  );
  const [selectedTemplate, setSelectedTemplate] = useState<string>("t1");

  return (
    <GoogleOAuthProvider clientId="598605355815-0fi7891f8fvr04ur6hcjuv7qrld1c5gp.apps.googleusercontent.com">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/signin"
          element={
            <AuthLayout title="Sign In">
              <SignIn setIsAuthenticated={setIsAuthenticated} />
            </AuthLayout>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthLayout title="Sign Up">
              <SignUp setIsAuthenticated={setIsAuthenticated} />
            </AuthLayout>
          }
        />

        {/* Dashboard as Root */}
        <Route
          path="/"
          element={
            <CareerLayout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            >
              <Dashboard
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
              />
            </CareerLayout>
          }
        />

        {/* Resume Route */}
        <Route path="/resume" element={<Resume />} />

        {/* Settings */}
        <Route
          path="/settings"
          element={
            <CareerLayout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            >
              <Settings />
            </CareerLayout>
          }
        />

        {/* Template Picker Route */}
        <Route
          path="/templates"
          element={
            <CareerLayout
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            >
              <TemplatePicker onSelect={setSelectedTemplate} />
            </CareerLayout>
          }
        />
      </Routes>
    </GoogleOAuthProvider>
  );
}

export default App;
