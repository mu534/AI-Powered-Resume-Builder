export interface ResumeData {
  name: string;
  title: string;
  address: string;
  email: string;
  summary: string;
  experience: {
    title: string;
    startDate: string;
    endDate: string;
    responsibilities: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
}
