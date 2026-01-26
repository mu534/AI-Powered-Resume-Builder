// src/types.ts

export interface PersonalDetails {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
}

export interface ResumeContent {
  personal: {
    name: string; // full name
    email: string;
    phone: string;
    summary: string;
  };
  experience: {
    title: string;
    company: string;
    dates: string;
    description: string;
  }[];
  skills: string[];
}

export interface Resume {
  createdAt: string; // must be string
  id: string;
  name: string;
  content: ResumeContent;
  templateId: string;
  coverImage?: string; // optional cover image
}
