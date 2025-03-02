export interface Resume {
  id: string;
  name: string;
  content: {
    personal: { name: string; email: string; phone: string; summary?: string };
    experience: Array<{
      title: string;
      company: string;
      dates: string;
      description: string;
    }>;
    skills: string[];
    education?: Array<{ degree: string; school: string; dates: string }>;
  };
  templateId: string;
  strengthScore?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  matchScore: number;
  appliedDate?: string;
}

export interface Template {
  id: string;
  name: string;
  preview: string;
  styles: {
    bg: string;
    text: string;
    accent: string;
  };
}

export interface CoverLetter {
  id: string;
  jobId: string;
  content: string;
  tone: "Formal" | "Conversational" | "Bold";
}
