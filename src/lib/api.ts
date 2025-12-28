// src/lib/api.ts
import { config } from "./config";

type ApiResult<T> =
  | { ok: true; data: T }
  | { ok: false; status: number; message: string };

function safeJsonParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  path: string,
  options?: RequestInit & { timeoutMs?: number }
): Promise<ApiResult<T>> {
  const controller = new AbortController();
  const timeoutMs = options?.timeoutMs ?? 15000;
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(`${config.apiBaseUrl}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers ?? {}),
      },
      signal: controller.signal,
      cache: "no-store",
    });

    const text = await res.text();
    const json = safeJsonParse(text);

    if (!res.ok) {
      const msg =
        (json && (json.message || json.error)) ||
        `Request failed (${res.status})`;
      return { ok: false, status: res.status, message: String(msg) };
    }

    return { ok: true, data: (json ?? ({} as T)) as T };
  } catch (e: any) {
    const isAbort = e?.name === "AbortError";
    return {
      ok: false,
      status: 0,
      message: isAbort ? "Request timed out. Please try again." : "Network error.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
