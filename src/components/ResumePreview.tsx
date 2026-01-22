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

  const name =
    `${personalDetails.firstName || ""} ${personalDetails.lastName || ""}`.trim();
  const jobTitle = personalDetails.jobTitle || "";
  const contact = [personalDetails.email, personalDetails.phone]
    .filter(Boolean)
    .join(" | ");

  const splitToBullets = (text = "") =>
    String(text)
      .split(/\n|\.|;/)
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 8);

  return (
    <article ref={resumeRef} className="w-full max-w-2xl mx-auto bg-white p-6">
      <header className="mb-4">
        <h1
          className="text-xl font-bold leading-tight text-gray-900"
          style={{ color: "var(--color-primary)" }}
        >
          {resumeTitle || name}
        </h1>
        {jobTitle && <p className="text-sm text-gray-700">{jobTitle}</p>}
        {contact && <p className="text-xs text-gray-600 mt-2">{contact}</p>}
      </header>

      {summary && (
        <section aria-labelledby="summary-heading" className="mb-4">
          <h2
            id="summary-heading"
            className="text-sm font-semibold text-gray-800 mb-1"
          >
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed">{summary}</p>
        </section>
      )}

      {experience.length > 0 && (
        <section aria-labelledby="exp-heading" className="mb-4">
          <h2
            id="exp-heading"
            className="text-sm font-semibold text-gray-800 mb-1"
          >
            Professional Experience
          </h2>
          <div className="space-y-3">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-sm font-medium text-gray-900">
                    {exp.positionTitle}
                  </h3>
                  <span className="text-xs text-gray-600">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-700 italic">
                  {exp.companyName}
                </p>
                <ul className="mt-2 list-disc ml-5 text-sm text-gray-700">
                  {splitToBullets(exp.summary).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {education.length > 0 && (
        <section aria-labelledby="edu-heading" className="mb-4">
          <h2
            id="edu-heading"
            className="text-sm font-semibold text-gray-800 mb-1"
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {edu.degree} — {edu.major}
                  </h3>
                  <span className="text-xs text-gray-600">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-xs text-gray-700">{edu.universityName}</p>
                <ul className="mt-2 list-disc ml-5 text-sm text-gray-700">
                  {splitToBullets(edu.description).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills.length > 0 && (
        <section aria-labelledby="skills-heading" className="mb-2">
          <h2
            id="skills-heading"
            className="text-sm font-semibold text-gray-800 mb-1"
          >
            Key Skills
          </h2>
          <p className="text-sm text-gray-700">
            {skills.map((s) => s.name).join(", ")}
          </p>
        </section>
      )}
    </article>
  );
};

export default ResumePreview;
