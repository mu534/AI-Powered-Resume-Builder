import React from "react";
import { render } from "@testing-library/react";
import ResumePreview from "../components/ResumePreview";

test("ResumePreview renders snapshot", () => {
  const props = {
    personalDetails: {
      firstName: "Jane",
      lastName: "Doe",
      jobTitle: "Engineer",
      email: "jane@example.com",
      phone: "123456",
    },
    themeColor: "#0f766e",
    summary: "Experienced engineer with a focus on frontend development.",
    resumeTitle: "Jane Doe - Frontend Engineer",
    experience: [
      {
        positionTitle: "Frontend Engineer",
        companyName: "ACME",
        startDate: "2020",
        endDate: "2023",
        summary: "Built components.",
      },
    ],
    education: [],
    skills: [{ name: "React", level: "Advanced" }],
    fontSize: 14,
    fontColor: "#111",
  };
  const { container } = render(<ResumePreview {...(props as any)} />);
  expect(container).toMatchSnapshot();
});
