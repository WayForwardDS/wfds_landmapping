const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    credentials: "include", // if you use cookies/session
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
} 