import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  const handleWipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Prevent default navigation
    alert("Working on it 🚧"); // Display message with emoji
  };

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        {/* Left Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">Resume AI</h2>
          <p className="text-gray-400 mt-2">
            Craft your perfect resume with AI precision.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2">
            <li>
              <a
                href="/about"
                onClick={handleWipClick}
                className="hover:text-indigo-400 transition"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/features"
                onClick={handleWipClick}
                className="hover:text-indigo-400 transition"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="mailto:mudassirnajimuddin@gmail.com"
                className="hover:text-indigo-400 transition"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a
              href="https://www.facebook.com/mudassir.najmuddiin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Follow us on Facebook"
            >
              <FaFacebookSquare className="text-xl" />
            </a>
            <a
              href="https://x.com/Mudasir14964?t=h_g14PX8YJ3zjkjvsHKqaA&s=35"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Follow us on X"
            >
              <FaTwitter className="text-xl" /> {/* Using FaTwitter for X */}
            </a>
            <a
              href="https://www.instagram.com/n_mudasir_n/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="text-xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/mudassir-najimuddin-127064328"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-colors duration-200"
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedin className="text-xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-6 pt-4 text-center text-gray-500">
        © {new Date().getFullYear()} Resume AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
