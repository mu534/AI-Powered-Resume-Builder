// src/types.ts
export interface PersonalDetails {
  firstName: string;
  lastName: string;
  jobTitle: string;
  address: string;
  phone: string;
  email: string;
}

export interface Resume {
  id: string;
  name: string;
  content: {
    personal: {
      name: string;
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
  };
  templateId: string;
}
