const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5173";

export async function getHashPath(page = "home") {
  const response = await fetch(`${API_BASE_URL}/api/hash?page=${encodeURIComponent(page)}`);

  if (!response.ok) {
    throw new Error("Could not generate hash path");
  }

  return response.json();
}
