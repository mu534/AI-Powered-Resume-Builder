import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface SavedResumeCardProps {
  title: string;
  createdAt: string;
  content: string;
  index: number;
}

const SavedResumeCard: React.FC<SavedResumeCardProps> = ({
  title,
  createdAt,
  index,
}) => {
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
    <Link to={`/resume-editor?title=${encodeURIComponent(title)}`}>
      <motion.div
        custom={index}
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
        <p className="text-lg font-medium text-white">{title}</p>
        <span className="mt-2 text-sm font-semibold text-white bg-blue-600 rounded-full px-3 py-1">
          Created on {new Date(createdAt).toLocaleDateString()}
        </span>
      </motion.div>
    </Link>
  );
};

export default SavedResumeCard;
