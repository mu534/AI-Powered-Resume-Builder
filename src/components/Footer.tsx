import React from "react";
import {
  FaFacebookSquare,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer: React.FC = () => {
  const handleWipClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("Working on it 🚧");
  };

  return (
    <footer className="bg-gray-900 text-white relative pt-12 pb-6 overflow-hidden">
      {/* Decorative gradient circles */}
      <div className="absolute -top-16 -left-16 w-72 h-72 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 opacity-20 pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-16 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-20 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-10 md:gap-0">
        {/* Brand */}
        <div className="flex flex-col items-start md:items-start gap-3">
          <h2 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
            Resume AI
          </h2>
          <p className="text-gray-300 text-sm sm:text-base">
            Craft your perfect resume with AI precision.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a
                href="/about"
                onClick={handleWipClick}
                className="hover:text-indigo-400 transition-all duration-300"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="/features"
                onClick={handleWipClick}
                className="hover:text-indigo-400 transition-all duration-300"
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="mailto:mudassirnajimuddin@gmail.com"
                className="hover:text-indigo-400 transition-all duration-300"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/mudassir.najmuddiin"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-transform duration-200 hover:scale-110"
              aria-label="Follow us on Facebook"
            >
              <FaFacebookSquare className="text-2xl sm:text-3xl" />
            </a>
            <a
              href="https://x.com/Mudasir14964?t=h_g14PX8YJ3zjkjvsHKqaA&s=35"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-transform duration-200 hover:scale-110"
              aria-label="Follow us on X"
            >
              <FaTwitter className="text-2xl sm:text-3xl" />
            </a>
            <a
              href="https://www.instagram.com/n_mudasir_n/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-transform duration-200 hover:scale-110"
              aria-label="Follow us on Instagram"
            >
              <FaInstagram className="text-2xl sm:text-3xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/mudassir-najimuddin-127064328"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-indigo-400 transition-transform duration-200 hover:scale-110"
              aria-label="Follow us on LinkedIn"
            >
              <FaLinkedin className="text-2xl sm:text-3xl" />
            </a>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-gray-400 text-sm sm:text-base">
        © {new Date().getFullYear()} Resume AI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
