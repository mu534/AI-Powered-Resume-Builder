import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PersonalDetails } from "../types";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { v4 as uuidv4 } from "uuid";

// Set the vfs using the pdfMake global object
pdfMake.vfs = pdfFonts.vfs;

// Register fonts
pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
};

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
  const [uniqueId, setUniqueId] = useState<string>("");

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

  // Generate or retrieve unique ID
  React.useEffect(() => {
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    if (!uniqueId) {
      const newId = uuidv4();
      setUniqueId(newId);
      const newResume = {
        id: newId,
        title: resumeTitle || name || "Untitled Resume",
        createdAt: new Date().toISOString(),
      };
      savedResumes.push(newResume);
      localStorage.setItem("resumes", JSON.stringify(savedResumes));
    }
  }, [uniqueId, name, resumeTitle]);

  const saveResumeToLocalStorage = () => {
    const savedResumes = JSON.parse(localStorage.getItem("resumes") || "[]");
    const resumeIndex = savedResumes.findIndex(
      (resume: { id: string }) => resume.id === uniqueId
    );
    if (resumeIndex === -1) {
      const newResume = {
        id: uniqueId,
        title: resumeTitle || name || "Untitled Resume",
        createdAt: new Date().toISOString(),
      };
      savedResumes.push(newResume);
    } else {
      savedResumes[resumeIndex] = {
        ...savedResumes[resumeIndex],
        title: resumeTitle || name || "Untitled Resume",
        createdAt: new Date().toISOString(),
      };
    }
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
          fontSize: 12,
        },
        pageSize: { width: 595.28, height: 841.89 },
        pageMargins: [40, 60, 40, 60] as [number, number, number, number], // [left, top, right, bottom] in points
      };
      pdfMake
        .createPdf(documentDefinition)
        .download(`${resumeTitle || name}.pdf`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${resumeTitle || name} Resume`,
          text: `Check out my resume: ${window.location.origin}/resume/${uniqueId}`,
          url: `${window.location.origin}/resume/${uniqueId}`,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 flex flex-col items-center justify-start w-screen h-screen"
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
        <div className="flex justify-center max-w-7xl mx-auto px-4 py-2 sm:px-6 lg:px-8 items-center">
          <button
            onClick={() => navigate("/Dashboard")}
            className="text-gray-600 hover:text-blue-600 transition-colors text-sm sm:text-base mr-8"
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

      <div className="flex-1 flex flex-col items-center justify-center w-full pt-16 sm:pt-20 md:pt-24 pb-8 sm:pb-10 md:pb-14 mx-4 sm:mx-6 md:mx-10">
        <div className="text-center mb-4 sm:mb-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl no-print">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-700">
            Congrats! Your Ultimate AI generated Resume is ready!
          </h2>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Now you are ready to download your resume and you can share unique
            resume URL with your friends and family
          </p>
        </div>

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

        <div
          ref={resumeRef}
          className="bg-white rounded-lg shadow-lg max-w-sm sm:max-w-md md:max-w-lg lg:max-w-3xl w-full p-4 sm:p-6 md:p-8 font-sans text-sm overflow-auto resume-content"
          style={{ borderTop: `6px solid ${themeColor}` }}
        >
          <div className="mb-6 sm:mb-8 text-center">
            <h1
              className="text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wide"
              style={{ color: themeColor }}
            >
              {jobTitle}
            </h1>

            <div
              className="flex flex-col gap-1 mt-2 text-xs sm:text-sm md:text-base"
              style={{ color: themeColor }}
            >
              <span>{address}</span>
              <span>
                {email} | {phone}
              </span>
            </div>
          </div>

          {summaryPoints.length > 0 && (
            <section className="mb-6 sm:mb-8">
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
            </section>
          )}

          {experiences.length > 0 && (
            <section className="mb-6 sm:mb-8">
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
            </section>
          )}

          {educations.length > 0 && (
            <section className="mb-6 sm:mb-8">
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
            </section>
          )}

          {skills.length > 0 && (
            <section className="mb-6 sm:mb-8">
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
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeFinal;
