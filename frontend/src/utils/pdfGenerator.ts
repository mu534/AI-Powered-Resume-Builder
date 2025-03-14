// utils/pdfGenerator.ts
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

export const downloadPDF = () => {
  const resumeElement = document.getElementById("resume-preview");

  if (!resumeElement) {
    console.error("Resume preview not found");
    return;
  }

  html2canvas(resumeElement, { scale: 2 }).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  });
};
