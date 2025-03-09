import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Dashboard: React.FC = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const magicCard = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 0.5 + i * 0.3,
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 20px rgba(0, 0, 255, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      {/* Header */}
      <nav className="bg-white shadow-md fixed w-full z-10 top-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-2xl font-bold text-blue-600"
          >
            ResumeAI
          </motion.div>
          <div className="space-x-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Dashboard
            </Link>
            <Link
              to="/settings"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Settings
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex-1 flex items-center justify-center"
      >
        <div className="max-w-4xl w-full space-y-8 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-4xl font-bold text-gray-900 tracking-tight"
          >
            My Resume
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Start Creating AI Resume to your next job role
          </motion.p>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Start Creating Card */}
            <Link to="/resume-editor">
              <motion.div
                custom={0}
                initial="hidden"
                animate="visible"
                variants={magicCard}
                whileHover="hover"
                className="bg-gray-100 p-6 rounded-3xl shadow-md cursor-pointer flex flex-col items-center justify-center h-64 hover:bg-gray-200 transition-all"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["-100%", "100%"],
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-4 h-4 bg-blue-400 rounded-full filter blur-sm opacity-50" />
                </motion.div>
                <span className="text-4xl text-gray-500 mb-4">+</span>
                <p className="text-lg font-medium text-gray-700">
                  Start Creating
                </p>
              </motion.div>
            </Link>

            {/* My First Resume Card */}
            <Link to="/resume-editor">
              <motion.div
                custom={1}
                initial="hidden"
                animate="visible"
                variants={magicCard}
                whileHover="hover"
                className="bg-gradient-to-br from-blue-200 to-blue-400 p-6 rounded-3xl shadow-md cursor-pointer flex flex-col items-center justify-center h-64"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["-100%", "100%"],
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-4 h-4 bg-blue-400 rounded-full filter blur-sm opacity-50" />
                </motion.div>
                <img
                  src="/resume-icon.png"
                  alt="Resume Icon"
                  className="w-24 h-24 mb-4"
                />
                <p className="text-lg font-medium text-white">
                  My First Resume
                </p>
                <span className="mt-2 text-sm font-semibold text-white bg-blue-600 rounded-full px-3 py-1">
                  New
                </span>
              </motion.div>
            </Link>

            {/* Full Stack Developer Card */}
            <Link to="/job-role">
              <motion.div
                custom={2}
                initial="hidden"
                animate="visible"
                variants={magicCard}
                whileHover="hover"
                className="bg-gradient-to-br from-pink-200 to-pink-400 p-6 rounded-3xl shadow-md cursor-pointer flex flex-col items-center justify-center h-64"
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    x: ["-100%", "100%"],
                    y: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 2,
                    ease: "easeInOut",
                  }}
                >
                  <div className="w-4 h-4 bg-pink-400 rounded-full filter blur-sm opacity-50" />
                </motion.div>
                <img
                  src="/developer-icon.png"
                  alt="Developer Icon"
                  className="w-24 h-24 mb-4"
                />
                <p className="text-lg font-medium text-white">
                  Full Stack Developer
                </p>
                <span className="mt-2 text-sm font-semibold text-white bg-pink-600 rounded-full px-3 py-1">
                  Popular
                </span>
              </motion.div>
            </Link>
          </div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 1 }}
            className="text-gray-500 text-sm"
          >
            Select a resume or job role to begin your journey with ResumeAI.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;
