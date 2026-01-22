// aiService.ts
import axios, { AxiosInstance, AxiosError } from "axios";

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

function wrapAxiosError(err: unknown) {
  if ((err as AxiosError).isAxiosError) {
    const ax = err as AxiosError;
    return new Error(
      ax.response?.data?.message || ax.message || "Network error",
    );
  }
  return new Error(String(err));
}

export const generateResume = async (data: Record<string, unknown>) => {
  try {
    const res = await requestWithRetry(() =>
      client.post("/api/ai/generate", data),
    );
    return (res as any).data;
  } catch (error) {
    console.error("generateResume failed:", error);
    throw wrapAxiosError(error);
  }
};

export const fetchTemplates = async () => {
  try {
    const res = await requestWithRetry(() => client.get("/templates"));
    return (res as any).data;
  } catch (error) {
    console.error("fetchTemplates failed:", error);
    throw wrapAxiosError(error);
  }
};
