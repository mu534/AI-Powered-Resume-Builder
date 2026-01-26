import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { PersonalDetails } from "../types";
import htmlToPdfmake from "html-to-pdfmake";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { v4 as uuidv4 } from "uuid";
import Card from "../Shared/components/Card";
import Button from "../Shared/components/Button";
import NavBar from "../components/NavBar";

pdfMake.vfs = pdfFonts.vfs;
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

interface SavedResume {
  id: string;
  title: string;
  createdAt: string;
}

const ResumeFinal: React.FC = () => {
  const location = useLocation();
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
    themeColor = "#4F46E5",
    fontSize = 16,
    fontColor = "#111827",
  } = state || {};

  const name =
    `${personalDetails.firstName || ""} ${personalDetails.lastName || ""}`.trim();
  const jobTitle = personalDetails.jobTitle || "";
  const address = personalDetails.address || "";
  const phone = personalDetails.phone || "";
  const email = personalDetails.email || "";

  const summaryPoints = summary
    .split(/\.|\n/)
    .filter(Boolean)
    .map((p) => p.trim() + ".");
  const getExperiencePoints = (summary: string) =>
    summary
      .split(/\.|\n/)
      .filter(Boolean)
      .map((p) => p.trim() + ".");
  const getEducationPoints = (desc: string) =>
    desc
      .split(/\.|\n/)
      .filter(Boolean)
      .map((p) => p.trim() + ".");

  // Generate unique ID for resume
  useEffect(() => {
    const savedResumes: SavedResume[] = JSON.parse(
      localStorage.getItem("resumes") || "[]",
    );
    if (!uniqueId) {
      const newId = uuidv4();
      setUniqueId(newId);
      const newResume: SavedResume = {
        id: newId,
        title: resumeTitle || name || "Untitled Resume",
        createdAt: new Date().toISOString(),
      };
      savedResumes.push(newResume);
      localStorage.setItem("resumes", JSON.stringify(savedResumes));
    }
  }, [uniqueId, name, resumeTitle]);

  const saveResumeToLocalStorage = () => {
    const savedResumes: SavedResume[] = JSON.parse(
      localStorage.getItem("resumes") || "[]",
    );
    const resumeIndex = savedResumes.findIndex((r) => r.id === uniqueId);
    const newResume: SavedResume = {
      id: uniqueId,
      title: resumeTitle || name || "Untitled Resume",
      createdAt: new Date().toISOString(),
    };
    if (resumeIndex === -1) savedResumes.push(newResume);
    else savedResumes[resumeIndex] = newResume;
    localStorage.setItem("resumes", JSON.stringify(savedResumes));
  };

  const handleDownload = () => {
    saveResumeToLocalStorage();
    if (resumeRef.current) {
      const html = resumeRef.current.innerHTML;
      const pdfContent = htmlToPdfmake(html);
      pdfMake
        .createPdf({
          content: pdfContent,
          defaultStyle: { font: "Roboto", fontSize: 12 },
          pageSize: "A4",
          pageMargins: [40, 60, 40, 60],
        })
        .download(`${resumeTitle || name}.pdf`);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${resumeTitle || name} Resume`,
        text: `Check out my resume: ${window.location.origin}/resume/${uniqueId}`,
        url: `${window.location.origin}/resume/${uniqueId}`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-purple-50 flex flex-col items-center w-full">
      <NavBar />
      <div className="flex-1 w-full max-w-5xl px-4 sm:px-6 md:px-10 pt-24 pb-12 flex flex-col items-center gap-6">
        <div className="text-center w-full max-w-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-700">
            Your AI-generated Resume is Ready!
          </h2>
          <p className="text-gray-500 mt-2 text-base">
            Download your resume or share it via a unique link.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
          <Button className="w-full" onClick={handleDownload}>
            Download
          </Button>
          <Button className="w-full" variant="secondary" onClick={handleShare}>
            Share
          </Button>
        </div>

        <Card className="w-full shadow-lg hover:shadow-xl transition-all duration-300">
          <div
            ref={resumeRef}
            className="p-6 sm:p-8 bg-white rounded-lg border-t-8"
            style={{ borderTopColor: themeColor }}
          >
            <div className="text-center mb-6">
              <h1
                className="text-2xl sm:text-3xl font-bold uppercase tracking-wide"
                style={{ color: themeColor }}
              >
                {jobTitle}
              </h1>
              <div
                className="mt-2 flex flex-col gap-1 text-sm sm:text-base"
                style={{ color: themeColor }}
              >
                <span>{address}</span>
                <span>
                  {email} | {phone}
                </span>
              </div>
            </div>

            {summaryPoints.length > 0 && (
              <Section title="Professional Summary" themeColor={themeColor}>
                <ul
                  className="list-disc list-inside space-y-1"
                  style={{ color: fontColor, fontSize }}
                >
                  {summaryPoints.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </Section>
            )}

            {experiences.length > 0 && (
              <Section title="Professional Experience" themeColor={themeColor}>
                {experiences.map((exp, i) => (
                  <div key={i} className="mb-4">
                    <h4
                      style={{ color: fontColor, fontSize: fontSize + 2 }}
                      className="font-medium"
                    >
                      {exp.positionTitle}
                    </h4>
                    <p
                      style={{ color: themeColor, fontSize: fontSize - 2 }}
                      className="italic text-sm sm:text-base"
                    >
                      {exp.companyName}, {exp.startDate} - {exp.endDate}
                    </p>
                    <ul
                      className="list-disc list-inside mt-2 space-y-1"
                      style={{ color: fontColor, fontSize: fontSize - 2 }}
                    >
                      {getExperiencePoints(exp.summary).map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Section>
            )}

            {educations.length > 0 && (
              <Section title="Education" themeColor={themeColor}>
                {educations.map((edu, i) => (
                  <div key={i} className="mb-4">
                    <h4
                      style={{ color: fontColor, fontSize: fontSize + 2 }}
                      className="font-medium"
                    >
                      {edu.degree} in {edu.major}
                    </h4>
                    <p
                      style={{ color: themeColor, fontSize: fontSize - 2 }}
                      className="italic text-sm sm:text-base"
                    >
                      {edu.universityName}, {edu.startDate} - {edu.endDate}
                    </p>
                    <ul
                      className="list-disc list-inside mt-2 space-y-1"
                      style={{ color: fontColor, fontSize: fontSize - 2 }}
                    >
                      {getEducationPoints(edu.description).map((point, j) => (
                        <li key={j}>{point}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Section>
            )}

            {skills.length > 0 && (
              <Section title="Key Skills" themeColor={themeColor}>
                <ul
                  className="list-disc list-inside space-y-1"
                  style={{ color: fontColor, fontSize }}
                >
                  {skills.map((skill, i) => (
                    <li key={i}>
                      {skill.name} - {skill.level}
                    </li>
                  ))}
                </ul>
              </Section>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}
const Section: React.FC<SectionProps> = ({ title, children, themeColor }) => (
  <section className="mb-6 sm:mb-8">
    <h3
      className="text-xl sm:text-2xl font-semibold mb-2 border-b-2"
      style={{ color: themeColor, borderColor: themeColor }}
    >
      {title}
    </h3>
    {children}
  </section>
);

export default ResumeFinal;
