import React from "react";
import { render, screen } from "@testing-library/react";
import CoverLetterGen from "../components/CoverLetterGen";

test("CoverLetterGen initial render", () => {
  const { container } = render(<CoverLetterGen />);
  expect(screen.getByText(/AI Cover Letter/i)).toBeInTheDocument();
  expect(container).toMatchSnapshot();
});
