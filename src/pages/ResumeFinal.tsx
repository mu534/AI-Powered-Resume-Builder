import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PersonalDetails } from "../types";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// Set the vfs using the pdfMake global object
pdfMake.vfs = pdfFonts.vfs;

// Register fonts instead of assigning to vfs directly
pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

// Set the vfs using the pdfMake global object
pdfMake.vfs = pdfFonts.vfs;

interface Experience {
  positionTitle: string;
  companyName: string;
  startDate: string;
  endDate: string;
  summary: string;
}

interface Education {
  universityName: string;
  degree: string;
  major: string;
  startDate: string;
  endDate: string;
  description: string;
}

interface Skill {
  name: string;
  level: string;
}

const ResumeFinal: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const resumeRef = useRef<HTMLDivElement>(null);

  const state = location.state as
    | {
        personalDetails: PersonalDetails;
        resumeTitle: string;
        summary: string;
        experiences: Experience[];
        educations: Education[];
        skills: Skill[];
        themeColor: string;
        fontSize: number;
        fontColor: string;
      }
    | undefined;

  const {
    personalDetails = {
      firstName: "",
      lastName: "",
      jobTitle: "",
      address: "",
      phone: "",
      email: "",
    },
    resumeTitle = "Untitled Resume",
    summary = "",
    experiences = [],
    educations = [],
    skills = [],
    themeColor = "#ff0000",
    fontSize = 16,
    fontColor = "#000000",
  } = state || {};

  const name = `${personalDetails.firstName || ""} ${
    personalDetails.lastName || ""
  }`.trim();
  const jobTitle = personalDetails.jobTitle || "";
  const address = personalDetails.address || "";
  const phone = personalDetails.phone || "";
  const email = personalDetails.email || "";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  const summaryPoints = summary
    .split(/\.|\n/)
    .filter((point) => point.trim().length > 0)
    .map((point) => point.trim() + ".");

  const getExperiencePoints = (summary: string) =>
    summary
      .split(/\.|\n/)
      .filter((point) => point.trim().length > 0)
      .map((point) => point.trim() + ".");

  const getEducationPoints = (description: string) =>
    description
      .split(/\.|\n/)
      .filter((point) => point.trim().length > 0)
      .map((point) => point.trim() + ".");

  const saveResumeToLocalStorage = () => {
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const newResume = {
      title: resumeTitle || name || "Untitled Resume",
      createdAt: new Date().toISOString(),
    };
    savedResumes.push(newResume);
    localStorage.setItem("resumes", JSON.stringify(savedResumes));
  };

  const handleDownload = () => {
    saveResumeToLocalStorage();
    if (resumeRef.current) {
      const html = resumeRef.current.innerHTML;
      const pdfContent = htmlToPdfmake(html);
      const documentDefinition = {
        content: pdfContent,
        defaultStyle: {
          font: "Roboto",
        },
      };
      pdfMake
        .createPdf(documentDefinition)
        .download(`${resumeTitle || name}.pdf`);
    }
  };

  const handleShare = () => {
    alert(
      "Share functionality to be implemented. Copy the URL manually for now."
    );
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-start w-screen h-screen"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      style={{ padding: 0, margin: 0 }}
    >
      <style>
        {`
          @media print {
            body {
              margin: 0;
              padding: 0;
            }
            .no-print {
              display: none !important;
            }
            .resume-content {
              box-shadow: none;
              border-top: none;
              width: 100%;
              max-width: 800px;
              margin: 20mm auto 0;
              padding: 20mm;
              height: auto;
            }
            @page {
              size: A4;
              margin: 0;
            }
            h1, h2, h3, h4, p, ul, li {
              color: #000000 !important;
            }
          }
        `}
      </style>
      <nav className="bg-white shadow-md w-full fixed top-0 z-10 no-print">
        <div className=" flex justify-end max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8  items-center">
          <button
            onClick={() => navigate("/Dashboard")}
            className=" text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base"
          >
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              Dashboard
            </Link>
          </button>
        </div>
      </nav>

      <motion.div
        className="flex-1 flex flex-col items-center justify-center w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-14 mx-4 sm:mx-6 md:mx-10"
        variants={itemVariants}
      >
        <motion.div className="text-center mb-4 sm:mb-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl no-print">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Now you are ready to download your resume and you can share unique
            resume URL with your friends and family
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-4 sm:mb-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl no-print">
          <button
            onClick={handleDownload}
            className="bg-purple-600 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Download
          </button>
          <button
            onClick={handleShare}
            className="bg-purple-600 text-white px-4 sm:px-5 py-2 sm:py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm sm:text-base w-full sm:w-auto"
          >
            Share
          </button>
        </div>

        <motion.div
          ref={resumeRef}
          variants={itemVariants}
          className="bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl w-full p-4 sm:p-6 md:p-8 font-sans text-sm overflow-auto resume-content"
          style={{ borderTop: `6px solid ${themeColor}` }}
        >
          <motion.div
            variants={itemVariants}
            className="mb-6 sm:mb-8 text-center"
          >
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              {resumeTitle || name}
            </h1>
            <h2
              className="text-lg sm:text-xl md:text-2xl font-medium"
              style={{ color: fontColor }}
            >
              {jobTitle}
            </h2>
            <div
              className="flex flex-col gap-1 mt-2 text-xs sm:text-sm md:text-base"
              style={{ color: themeColor }}
            >
              <span>{address}</span>
              <span>{phone}</span>
              <span>{email}</span>
            </div>
          </motion.div>

          {summaryPoints.length > 0 && (
            <motion.section variants={itemVariants} className="mb-6 sm:mb-8">
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Professional Summary
              </h3>
              <ul
                className="list-disc list-inside space-y-1"
                style={{ color: fontColor, fontSize: `${fontSize}px` }}
              >
                {summaryPoints.map((point, index) => (
                  <li key={index} className="text-sm sm:text-base md:text-lg">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}

          {experiences.length > 0 && (
            <motion.section variants={itemVariants} className="mb-6 sm:mb-8">
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Professional Experience
              </h3>
              {experiences.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4
                    className="font-medium text-lg sm:text-xl md:text-2xl"
                    style={{ color: fontColor, fontSize: `${fontSize}px` }}
                  >
                    {exp.positionTitle}
                  </h4>
                  <p
                    className="text-xs sm:text-sm md:text-base italic"
                    style={{ color: themeColor, fontSize: `${fontSize - 2}px` }}
                  >
                    {exp.companyName}, {exp.startDate} - {exp.endDate}
                  </p>
                  <ul
                    className="list-disc list-inside mt-2 space-y-1 text-xs sm:text-sm md:text-base"
                    style={{ color: fontColor, fontSize: `${fontSize - 2}px` }}
                  >
                    {getExperiencePoints(exp.summary).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.section>
          )}

          {educations.length > 0 && (
            <motion.section variants={itemVariants} className="mb-6 sm:mb-8">
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Education
              </h3>
              {educations.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4
                    className="font-medium text-lg sm:text-xl md:text-2xl"
                    style={{ color: fontColor, fontSize: `${fontSize}px` }}
                  >
                    {edu.degree} in {edu.major}
                  </h4>
                  <p
                    className="text-xs sm:text-sm md:text-base italic"
                    style={{ color: themeColor, fontSize: `${fontSize - 2}px` }}
                  >
                    {edu.universityName}, {edu.startDate} - {edu.endDate}
                  </p>
                  <ul
                    className="list-disc list-inside mt-2 space-y-1 text-xs sm:text-sm md:text-base"
                    style={{ color: fontColor, fontSize: `${fontSize - 2}px` }}
                  >
                    {getEducationPoints(edu.description).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.section>
          )}

          {skills.length > 0 && (
            <motion.section variants={itemVariants} className="mb-6 sm:mb-8">
              <h3
                className="text-lg sm:text-xl md:text-2xl font-semibold mb-2 border-b-2"
                style={{ color: themeColor, borderColor: themeColor }}
              >
                Key Skills
              </h3>
              <ul
                className="list-disc list-inside space-y-1 text-xs sm:text-sm md:text-base"
                style={{ color: fontColor, fontSize: `${fontSize - 2}px` }}
              >
                {skills.map((skill, index) => (
                  <li key={index} className="text-sm sm:text-base md:text-lg">
                    {skill.name} - {skill.level}
                  </li>
                ))}
              </ul>
            </motion.section>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ResumeFinal;
