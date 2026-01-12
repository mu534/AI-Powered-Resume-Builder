import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ResumeForm from "../ResumeForm";

// Mock the setResumeData function
const mockSetResumeData = jest.fn();

describe("ResumeForm", () => {
  beforeEach(() => {
    mockSetResumeData.mockClear();
  });

  test("renders form fields", () => {
    render(<ResumeForm setResumeData={mockSetResumeData} />);
    expect(screen.getByPlaceholderText(/john doe/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/software developer/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/john.doe@example.com/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter phone number/i)
    ).toBeInTheDocument();
  });

  test("fields have required attributes where applicable", () => {
    render(<ResumeForm setResumeData={mockSetResumeData} />);
    const name = screen.getByPlaceholderText(/john doe/i) as HTMLInputElement;
    const job = screen.getByPlaceholderText(
      /software developer/i
    ) as HTMLInputElement;
    const email = screen.getByPlaceholderText(
      /john.doe@example.com/i
    ) as HTMLInputElement;

    expect(name).toHaveAttribute("required");
    expect(job).toHaveAttribute("required");
    expect(email).toHaveAttribute("required");
  });

  test("updates resume data when fields change", async () => {
    render(<ResumeForm setResumeData={mockSetResumeData} />);
    fireEvent.input(screen.getByPlaceholderText(/john doe/i), {
      target: { value: "John Doe" },
    });
    fireEvent.input(screen.getByPlaceholderText(/software developer/i), {
      target: { value: "Software Engineer" },
    });
    fireEvent.input(screen.getByPlaceholderText(/john.doe@example.com/i), {
      target: { value: "john@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText(/enter phone number/i), {
      target: { value: "+1234567890" },
    });

    await waitFor(() =>
      expect(mockSetResumeData).toHaveBeenCalledWith({
        name: "John Doe",
        jobTitle: "Software Engineer",
        email: "john@example.com",
        phone: "+1234567890",
        experience: "",
        skills: [],
        education: "",
        summary: "",
        certifications: [],
        projects: [],
        languages: [],
        achievements: "",
        links: "",
      })
    );
  });
});
