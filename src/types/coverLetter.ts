// types/coverLetter.ts
export type CoverLetterTone = "Formal" | "Conversational" | "Bold";

export interface CoverLetterForm {
  recipient: string;
  jobTitle: string;
  company: string;
  intro: string;
  skills: string;
  closing: string;
  tone: CoverLetterTone;
}
