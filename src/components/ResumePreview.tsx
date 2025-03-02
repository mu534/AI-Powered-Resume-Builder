import React from "react";

type ResumeProps = {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  experience: string;
  skills: string;
  education: string;
  summary: string;
  certifications: string;
  projects: string;
  languages: string;
  achievements: string;
  links: string;
};

const ResumePreview: React.FC<{ data: ResumeProps }> = ({ data }) => {
  // Helper function to render list items from a comma-separated string
  const renderListItems = (items: string) => {
    return items
      .split(",")
      .filter((item) => item.trim()) // Filter out empty strings
      .map((item, index) => (
        <li key={index} className="mb-1 text-gray-700">
          {item.trim()}
        </li>
      ));
  };

  // Helper function to render a section if the data exists
  const renderSection = (
    title: string,
    content: string,
    isList: boolean = false
  ) => {
    if (!content.trim()) return null; // Skip rendering if content is empty

    return (
      <section className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
          {title}
        </h3>
        {isList ? (
          <ul className="list-disc pl-5 text-gray-700">
            {renderListItems(content)}
          </ul>
        ) : (
          <p className="text-gray-700 whitespace-pre-line">{content}</p>
        )}
      </section>
    );
  };

  return (
    <div
      id="resume-preview"
      className="p-6 sm:p-8 bg-white shadow-lg rounded-lg w-full max-w-3xl mx-auto font-serif"
    >
      {/* Header Section */}
      <div className="text-center mb-6 pb-4 border-b border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          {data.name}
        </h1>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-4">
          {data.jobTitle}
        </h2>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 text-gray-600">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <span>{data.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>{data.phone}</span>
          </div>
        </div>
      </div>

      {/* Profile Summary */}
      {renderSection("Profile Summary", data.summary)}

      {/* Experience */}
      {renderSection("Professional Experience", data.experience)}

      {/* Skills */}
      {renderSection("Skills", data.skills, true)}

      {/* Education */}
      {renderSection("Education", data.education)}

      {/* Certifications */}
      {renderSection("Certifications", data.certifications)}

      {/* Projects */}
      {renderSection("Projects", data.projects)}

      {/* Languages */}
      {renderSection("Languages", data.languages, true)}

      {/* Achievements */}
      {renderSection("Achievements", data.achievements)}

      {/* Portfolio / Links */}
      {data.links && (
        <section className="mb-6">
          <h3 className="text-xl font-bold text-gray-800 border-b-2 border-gray-200 pb-1 mb-2">
            Portfolio / Links
          </h3>
          <a
            href={data.links}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="break-all">{data.links}</span>
          </a>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
