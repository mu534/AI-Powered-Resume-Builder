import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiEye, HiEyeOff } from "react-icons/hi";

interface SignUpProps {
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setIsAuthenticated }) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

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
        localStorage.setItem("authToken", data.token || "dummy-token"); // Store token from backend
        setIsAuthenticated(true); // Update auth state
        navigate("/"); // Redirect to Dashboard
      } else {
        setError(data.message || "Sign-up failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("An error occurred during sign-up.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <p className="text-gray-700 text-center">
        Create your account to unlock your career potential!
      </p>

      {error && <div className="text-red-500 text-center">{error}</div>}
      {isLoading && (
        <div className="text-indigo-500 text-center">Loading...</div>
      )}

      <div>
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
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          value={name}
          onChange={(e) => setName(e.target.value)}
          disabled={isLoading}
        />
      </div>

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

      <div className="relative">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="password"
        >
          Password
        </label>
        <input
          type={passwordVisible ? "text" : "password"}
          id="password"
          placeholder="Enter your password"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
        <div
          onClick={() => setPasswordVisible(!passwordVisible)}
          className="absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer"
        >
          {passwordVisible ? (
            <HiEyeOff size={24} className="text-gray-500" />
          ) : (
            <HiEye size={24} className="text-gray-500" />
          )}
        </div>
      </div>

      <button
        className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-200 disabled:bg-indigo-400"
        onClick={handleSignUp}
        disabled={isLoading}
      >
        Sign Up
      </button>

      <p className="text-gray-600 text-sm text-center">
        Already have an account?{" "}
        <a href="/signin" className="text-indigo-600 hover:underline">
          Sign in
        </a>
      </p>
    </div>
  );
};

export default SignUp;
