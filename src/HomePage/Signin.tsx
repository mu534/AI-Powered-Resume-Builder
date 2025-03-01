import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle manual email sign-in with password
  const handleManualSignIn = () => {
    if (!email || !password) {
      setError("Please enter both your email address and password.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate a backend email and password check
    setTimeout(() => {
      // Simulating the backend check for both email and password
      const isValidUser =
        email === "existinguser@example.com" && password === "password123"; // Example user credentials

      if (isValidUser) {
        console.log("User signed in:", email);
        navigate("/resume"); // Redirect to the Resume page
      } else {
        setError("The email or password is incorrect. Please try again.");
      }

      setIsLoading(false);
    }, 1000); // Simulate a 1-second delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Sign in to AI Resume Builder
        </h1>
        <p className="text-gray-600 mb-6">
          Welcome back! Please sign in to continue
        </p>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {isLoading && (
          <div className="mb-4 text-blue-500 text-center">Loading...</div>
        )}

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email address
          </label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email address"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <button
          className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-300 mb-4"
          onClick={handleManualSignIn}
          disabled={isLoading}
        >
          Continue →
        </button>

        <p className="text-gray-600 text-sm text-center">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
