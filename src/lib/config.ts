// src/lib/config.ts
export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_URL || "",
  env: process.env.NEXT_PUBLIC_ENV || "development",
};

export function assertPublicEnv() {
  if (!config.apiBaseUrl) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_URL. Create .env.local from .env.example."
    );
  }
}
