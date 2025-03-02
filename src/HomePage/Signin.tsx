import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SignInProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignIn: React.FC<SignInProps> = ({ setIsAuthenticated }) => {
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

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    // Simulate a backend email and password check
    setTimeout(() => {
      const isValidUser =
        email === "existinguser@example.com" && password === "password123"; // Example credentials

      if (isValidUser) {
        console.log("User signed in:", email);
        localStorage.setItem("authToken", "dummy-token"); // Simulate token storage
        setIsAuthenticated(true); // Update auth state
        navigate("/"); // Redirect to Dashboard
      } else {
        setError("The email or password is incorrect. Please try again.");
      }

      setIsLoading(false);
    }, 1000); // Simulate 1-second delay
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-center">
        Welcome back! Sign in to continue your career journey.
      </p>

      {error && <div className="text-red-500 text-center">{error}</div>}
      {isLoading && (
        <div className="text-indigo-500 text-center">Loading...</div>
      )}

      <div>
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div>
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <button
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-indigo-400"
        onClick={handleManualSignIn}
        disabled={isLoading}
      >
        Continue →
      </button>

      <p className="text-gray-600 text-sm text-center">
        Don’t have an account?{" "}
        <a href="/signup" className="text-indigo-600 hover:underline">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default SignIn;
