import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi"; // Import eye icons

const SignUp: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false); // Password visibility state
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Password validation: must be at least 8 characters long
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    // Optional: Additional password strength check (e.g., lowercase, uppercase, number, special character)
    const passwordStrengthRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordStrengthRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one number, and one special character."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Sending the data to the backend
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User signed up:", data);
        navigate("/resume"); // Redirect after successful sign-up
      } else {
        setError(data.message); // Display error message
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("An error occurred during sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Sign up for AI Resume Builder
        </h1>
        <p className="text-gray-600 mb-6">Create your account to get started</p>

        {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
        {isLoading && (
          <div className="mb-4 text-blue-500 text-center">Loading...</div>
        )}

        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Full Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter your full name"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={isLoading}
          />
        </div>

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

        <div className="mb-6 relative">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type={passwordVisible ? "text" : "password"} // Toggle password visibility
            id="password"
            placeholder="Enter your password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
          {/* Eye icon to toggle visibility */}
          <div
            onClick={() => setPasswordVisible(!passwordVisible)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
          >
            {passwordVisible ? (
              <HiEyeOff size={24} className="text-gray-500" />
            ) : (
              <HiEye size={24} className="text-gray-500" />
            )}
          </div>
        </div>

        <button
          className="w-full bg-gray-800 text-white font-semibold py-3 px-4 rounded-lg hover:bg-gray-900 transition duration-300 mb-4"
          onClick={handleSignUp}
          disabled={isLoading}
        >
          Sign Up
        </button>

        <p className="text-gray-600 text-sm text-center">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-600 hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
