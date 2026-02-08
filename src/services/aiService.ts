import axios, { AxiosInstance, AxiosResponse } from "axios";

const API_URL =
  (import.meta.env.VITE_API_URL as string) || "http://localhost:5000";

const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

async function requestWithRetry<T>(
  fn: () => Promise<T>,
  attempts = 3,
  delayMs = 500,
): Promise<T> {
  let lastError: unknown;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < attempts - 1) {
        await new Promise((res) => setTimeout(res, delayMs * Math.pow(2, i)));
      }
    }
  }
  throw lastError;
}

// Generate recruiter-style, concise resume summary
export const generateResume = async ({
  firstName,
  lastName,
  role,
  skills,
  experience,
}: {
  firstName: string;
  lastName: string;
  role?: string;
  skills?: string[];
  experience?: string[];
}): Promise<string> => {
  const bullets = [...(skills || []), ...(experience || [])]
    .map((b) => `- ${b}`)
    .join("\n");

  const prompt = `
You are a recruiter and professional resume writer.

Write a concise, practical resume summary (2–3 sentences, max 50 words) for the candidate below. Focus ONLY on role, key skills, and measurable achievements. Avoid generic adjectives or filler words. Must be ATS-friendly and suitable for direct use in a resume.

Candidate Name: ${firstName} ${lastName}
${role ? `Role/Title: ${role}` : ""}
${bullets ? `Candidate Details:\n${bullets}` : ""}
`;

  try {
    const res: AxiosResponse<{ text?: string }> = await requestWithRetry(() =>
      client.post("/api/ai/generate", { prompt }),
    );

    const text = res.data?.text || "";
    const cleaned = text.replace(/\n/g, " ").replace(/\s+/g, " ").trim();
    const words = cleaned.split(" ");
    return words.length > 50 ? words.slice(0, 50).join(" ") + "..." : cleaned;
  } catch (error: unknown) {
    console.error("generateResume failed:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};

// Fetch templates safely
export const fetchTemplates = async (): Promise<Record<string, unknown>> => {
  try {
    const res: AxiosResponse<Record<string, unknown>> = await requestWithRetry(
      () => client.get("/templates"),
    );
    return res.data;
  } catch (error: unknown) {
    console.error("fetchTemplates failed:", error);

    if (error instanceof Error) {
      throw error;
    }
    throw new Error(String(error));
  }
};
