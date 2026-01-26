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
    <article
      ref={resumeRef}
      className="w-full max-w-3xl mx-auto bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-lg"
    >
      {/* Header */}
      <header className="mb-6 sm:mb-8 text-center">
        <h1
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight"
          style={{ color: themeColor }}
        >
          {resumeTitle || name}
        </h1>
        {jobTitle && (
          <p className="text-sm sm:text-base text-gray-700 mt-1">{jobTitle}</p>
        )}
        {contact && (
          <p className="text-xs sm:text-sm text-gray-500 mt-1">{contact}</p>
        )}
      </header>

      {/* Summary */}
      {summary && (
        <Section title="Professional Summary" themeColor={themeColor}>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            {summary}
          </p>
        </Section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <Section title="Professional Experience" themeColor={themeColor}>
          <div className="space-y-4">
            {experience.map((exp, idx) => (
              <div key={idx}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">
                    {exp.positionTitle}
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {exp.startDate} — {exp.endDate}
                  </span>
                </div>
                <p className="text-xs sm:text-sm italic text-gray-600">
                  {exp.companyName}
                </p>
                <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  {splitToBullets(exp.summary).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <Section title="Education" themeColor={themeColor}>
          <div className="space-y-4">
            {education.map((edu, idx) => (
              <div key={idx}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 sm:gap-0">
                  <h3 className="text-sm sm:text-base font-medium text-gray-900">
                    {edu.degree} — {edu.major}
                  </h3>
                  <span className="text-xs sm:text-sm text-gray-500">
                    {edu.startDate} — {edu.endDate}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">
                  {edu.universityName}
                </p>
                <ul className="mt-2 list-disc list-inside text-sm sm:text-base text-gray-700 space-y-1">
                  {splitToBullets(edu.description).map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <Section title="Key Skills" themeColor={themeColor}>
          <p className="text-sm sm:text-base text-gray-700 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span
                key={i}
                className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs sm:text-sm"
              >
                {s.name} ({s.level})
              </span>
            ))}
          </p>
        </Section>
      )}
    </article>
  );
};

interface SectionProps {
  title: string;
  children: React.ReactNode;
  themeColor: string;
}

const Section: React.FC<SectionProps> = ({ title, children, themeColor }) => (
  <section className="mb-6 sm:mb-8">
    <h2
      className="text-sm sm:text-base md:text-lg font-semibold mb-2 border-b-2 pb-1"
      style={{ borderColor: themeColor, color: themeColor }}
    >
      {title}
    </h2>
    {children}
  </section>
);

export default ResumePreview;
