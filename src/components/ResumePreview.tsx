import React, { useRef } from "react";
import { PersonalDetails } from "../types";

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

interface ResumePreviewProps {
  personalDetails: PersonalDetails;
  themeColor: string;
  summary: string;
  resumeTitle: string;
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  fontSize: number;
  fontColor: string;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  personalDetails,
  themeColor,
  summary,
  resumeTitle,
  experience = [],
  education = [],
  skills = [],
  fontSize,
  fontColor,
}) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const name = `${personalDetails.firstName || "Mudassir"} ${
    personalDetails.lastName || "Najimudin"
  }`.trim();
  const jobTitle = personalDetails.jobTitle || "Developer";
  const address = personalDetails.address || "Ethio";
  const email = personalDetails.email || "mudassirnajimudin@gmail.com | ";
  const phone = personalDetails.phone || "0935815070";

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

  return (
    <div
      ref={resumeRef}
      className="bg-white rounded-lg shadow-md w-full max-w-2xl mx-auto p-6 font-sans text-sm"
    >
      <div className="mb-6 text-center">
        <h1
          className="text-2xl font-bold uppercase tracking-wide"
          style={{ color: themeColor, fontSize: `${fontSize + 4}px` }}
        >
          {resumeTitle || name}
        </h1>
        <h2
          className="text-lg font-medium"
          style={{ color: fontColor, fontSize: `${fontSize + 1}px` }}
        >
          {jobTitle}
        </h2>
        <div
          className="flex flex-col gap-1 mt-2 text-xs"
          style={{ color: fontColor }}
        >
          <span>{address}</span>
          <span>
            {email} | {phone}
          </span>
        </div>
      </div>

      {summaryPoints.length > 0 && (
        <section className="mb-6">
          <h3
            className="text-lg font-semibold mb-2 border-b-2 pb-1"
            style={{
              color: themeColor,
              fontSize: `${fontSize + 2}px`,
              borderColor: themeColor,
            }}
          >
            Professional Summary
          </h3>
          <ul
            className="list-disc list-inside space-y-1 pl-0"
            style={{ color: fontColor, fontSize: `${fontSize}px` }}
          >
            {summaryPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </section>
      )}

      {experience.length > 0 && (
        <section className="mb-6">
          <h3
            className="text-lg font-semibold mb-2 border-b-2 pb-1"
            style={{
              color: themeColor,
              fontSize: `${fontSize + 2}px`,
              borderColor: themeColor,
            }}
          >
            Professional Experience
          </h3>
          {experience.map((exp, index) => (
            <div key={index} className="mb-4">
              <h4
                className="font-medium"
                style={{ color: fontColor, fontSize: `${fontSize}px` }}
              >
                {exp.positionTitle}
              </h4>
              <p
                className="text-xs italic"
                style={{ color: themeColor, fontSize: `${fontSize - 2}px` }}
              >
                {exp.companyName}, {exp.startDate} - {exp.endDate}
              </p>
              <ul
                className="list-disc list-inside mt-2 space-y-1 pl-0"
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

      {education.length > 0 && (
        <section className="mb-6">
          <h3
            className="text-lg font-semibold mb-2 border-b-2 pb-1"
            style={{
              color: themeColor,
              fontSize: `${fontSize + 2}px`,
              borderColor: themeColor,
            }}
          >
            Education
          </h3>
          {education.map((edu, index) => (
            <div key={index} className="mb-4">
              <h4
                className="font-medium"
                style={{ color: fontColor, fontSize: `${fontSize}px` }}
              >
                {edu.degree} in {edu.major}
              </h4>
              <p
                className="text-xs italic"
                style={{ color: themeColor, fontSize: `${fontSize - 2}px` }}
              >
                {edu.universityName}, {edu.startDate} - {edu.endDate}
              </p>
              <ul
                className="list-disc list-inside mt-2 space-y-1 pl-0"
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
        <section className="mb-6">
          <h3
            className="text-lg font-semibold mb-2 border-b-2 pb-1"
            style={{
              color: themeColor,
              fontSize: `${fontSize + 2}px`,
              borderColor: themeColor,
            }}
          >
            Key Skills
          </h3>
          <ul
            className="list-disc list-inside space-y-1 pl-0"
            style={{ color: fontColor, fontSize: `${fontSize - 2}px` }}
          >
            {skills.map((skill, index) => (
              <li key={index}>
                {skill.name} - {skill.level}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
