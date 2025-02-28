import React from "react";
import { motion } from "framer-motion";

const Home: React.FC = () => {
  // Animation variants for fade-in and slide-up
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

  // Magic animation for "How It Works" cards
  const magicCard = {
    hidden: { opacity: 0, scale: 0.8, rotate: -10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: 1.4 + i * 0.3, // Staggered entrance
        duration: 0.7,
        ease: "easeOut",
        type: "spring",
        bounce: 0.4,
      },
    }),
    hover: {
      scale: 1.05,
      rotate: 2,
      boxShadow: "0 10px 20px rgba(0, 0, 255, 0.2)",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      {/* Navbar */}
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
            <a
              href="#features"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-blue-600 transition duration-300"
            >
              How It Works
            </a>
            <button className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center min-h-screen">
        <div className="max-w-3xl w-full space-y-8 text-center">
          {/* Header */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight"
          >
            Welcome to <span className="text-blue-600">ResumeAI</span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={slideUp}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600"
          >
            Craft Your Perfect Resume with AI Precision
          </motion.p>

          {/* Intro Text */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.4 }}
            className="text-lg text-gray-700 leading-relaxed"
          >
            Unlock your career potential with the smartest resume builder on the
            planet. Powered by cutting-edge artificial intelligence, ResumeAI
            creates tailored, professional resumes that stand out to
            employers—all in minutes.
          </motion.p>

          {/* Why Choose Us */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Why Choose Us?
            </h2>
            <ul className="space-y-4 text-gray-600 text-left max-w-xl mx-auto">
              {[
                "AI-Driven Customization: Our advanced AI analyzes your skills, experience, and goals to craft a resume that’s uniquely yours.",
                "Job-Winning Templates: Sleek, modern designs optimized for ATS and human recruiters alike.",
                "Effortless Process: Input your details, and let our AI do the heavy lifting—no writing skills required!",
                "Real-Time Feedback: Get instant suggestions to improve your content and boost your chances.",
                "Fast & Free to Start: Build your resume in minutes, with premium options for added polish.",
              ].map((item, index) => (
                <motion.li
                  key={index}
                  initial="hidden"
                  animate="visible"
                  variants={slideUp}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="flex items-start"
                >
                  <span className="text-blue-500 mr-2">✔</span>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item.replace(/:(.*)/, ":<strong>$1</strong>"),
                    }}
                  />
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* How It Works with Magic Animation */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 1.2 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-gray-600 relative">
              {[
                {
                  step: "1.",
                  title: "Tell Us About Yourself",
                  desc: "Share your experience, education, and skills—or upload an existing resume.",
                },
                {
                  step: "2.",
                  title: "Let AI Work Its Magic",
                  desc: "Our intelligent system enhances your info for maximum impact.",
                },
                {
                  step: "3.",
                  title: "Download & Apply",
                  desc: "Choose your design, download, and start applying with confidence!",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={magicCard}
                  whileHover="hover"
                  className="bg-white p-4 rounded-lg shadow-md relative overflow-hidden"
                >
                  {/* Sparkle Effect */}
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
                      repeatDelay: index === 1 ? 1 : 2, // Stagger sparkles
                      ease: "easeInOut",
                    }}
                  >
                    <div className="w-4 h-4 bg-blue-400 rounded-full filter blur-sm opacity-50" />
                  </motion.div>
                  <span className="text-blue-600 font-bold text-lg">
                    {item.step}
                  </span>
                  <p className="mt-2">
                    <strong>{item.title}</strong>
                    <br />
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ delay: 2 }}
            className="space-y-4"
          >
            <h2 className="text-2xl font-semibold text-gray-800">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-gray-600">
              Join thousands of job seekers who’ve transformed their careers
              with ResumeAI. Start building your future today!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Get Started Now
            </motion.button>
            <p className="text-sm text-gray-500">
              No account needed—start for free!
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
