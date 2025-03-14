import { useState, useCallback } from "react";
import { Resume } from "../types";

export const useResume = (initialResume: Resume) => {
  const [resume, setResume] = useState<Resume>(initialResume);

  const updatePersonal = useCallback(
    (field: keyof Resume["content"]["personal"], value: string) => {
      setResume((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          personal: { ...prev.content.personal, [field]: value },
        },
      }));
    },
    []
  );

  const addExperience = useCallback(
    (exp: Resume["content"]["experience"][0]) => {
      setResume((prev) => ({
        ...prev,
        content: {
          ...prev.content,
          experience: [...prev.content.experience, exp],
        },
      }));
    },
    []
  );

  const calculateStrength = useCallback(() => {
    const score = Math.min(
      100,
      resume.content.skills.length * 10 +
        resume.content.experience.length * 20 +
        (resume.content.personal.summary ? 20 : 0)
    );
    setResume((prev) => ({ ...prev, strengthScore: score }));
  }, [resume]);

  return { resume, updatePersonal, addExperience, calculateStrength };
};
