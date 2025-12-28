const KEY = "sandbox_auth";

export type AuthUser = { email: string };

export function getUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function login(email: string) {
  localStorage.setItem(KEY, JSON.stringify({ email }));
}

export function logout() {
  localStorage.removeItem(KEY);
}

export function isAuthed() {
  return !!getUser();
}
