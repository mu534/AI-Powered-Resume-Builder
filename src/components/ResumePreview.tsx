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
    return items.split(",").map((item, index) => (
      <li key={index} style={{ marginBottom: "0.25rem" }}>
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
    if (!content) return null; // Skip rendering if content is empty

    return (
      <section style={{ marginBottom: "1.25rem" }}>
        <h3
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)", // Responsive font size
            fontWeight: 700,
            color: "#1f2a44",
            borderBottom: "2px solid #e0e0e0",
            paddingBottom: "0.25rem",
            marginBottom: "0.5rem",
          }}
        >
          {title}
        </h3>
        {isList ? (
          <ul
            style={{
              listStyle: "disc",
              paddingLeft: "1.25rem",
              color: "#333333",
              fontSize: "clamp(0.875rem, 2vw, 1rem)", // Responsive font size
            }}
          >
            {renderListItems(content)}
          </ul>
        ) : (
          <p
            style={{
              color: "#333333",
              fontSize: "clamp(0.875rem, 2vw, 1rem)", // Responsive font size
              lineHeight: "1.5",
              whiteSpace: "pre-line",
            }}
          >
            {content}
          </p>
        )}
      </section>
    );
  };

  return (
    <div
      id="resume-preview"
      style={{
        padding: "clamp(1rem, 5vw, 2rem)", // Responsive padding
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "0.25rem",
        width: "100%", // Full width instead of fixed 8.5in
        maxWidth: "8.5in", // Cap at A4 width for larger screens
        minHeight: "auto", // Remove fixed height, let content dictate
        margin: "0 auto",
        fontFamily: "'Garamond', serif",
        color: "#333333",
        lineHeight: "1.4",
        boxSizing: "border-box", // Ensure padding doesn’t overflow
      }}
    >
      {/* Header Section */}
      <div
        style={{
          textAlign: "center",
          marginBottom: "clamp(1rem, 3vw, 1.5rem)", // Responsive margin
          paddingBottom: "clamp(0.5rem, 2vw, 1rem)", // Responsive padding
          borderBottom: "1px solid #d3d3d3",
        }}
      >
        <h3
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)", // Responsive font size
            fontWeight: 700,
            color: "#1f2a44",
            marginBottom: "0.5rem",
          }}
        >
          {data.name}
        </h3>
        <h4
          style={{
            fontSize: "clamp(1.5rem, 4vw, 2rem)", // Responsive font size
            fontWeight: 700,
            color: "black",
            marginBottom: "0.5rem",
          }}
        >
          {data.jobTitle}
        </h4>
        <p
          style={{
            fontSize: "clamp(0.875rem, 2vw, 1rem)", // Responsive font size
            color: "#555555",
            letterSpacing: "0.02em",
            wordWrap: "break-word", // Prevent overflow on small screens
          }}
        >
          {data.email} | {data.phone}
        </p>
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
        <section style={{ marginBottom: "1.25rem" }}>
          <h3
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.25rem)", // Responsive font size
              fontWeight: 700,
              color: "#1f2a44",
              borderBottom: "2px solid #e0e0e0",
              paddingBottom: "0.25rem",
              marginBottom: "0.5rem",
            }}
          >
            Portfolio / Links
          </h3>
          <a
            href={data.links}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1e90ff",
              textDecoration: "none",
              fontSize: "clamp(0.875rem, 2vw, 1rem)", // Responsive font size
              wordBreak: "break-all", // Ensure long URLs don’t overflow
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseOut={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {data.links}
          </a>
        </section>
      )}
    </div>
  );
};

export default ResumePreview;
