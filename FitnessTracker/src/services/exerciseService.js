const BASE_URL = import.meta.env.VITE_EXERCISEDB_BASE_URL;
const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

function headers() {
  return {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  };
}

async function safeFetch(url) {
  const res = await fetch(url, { headers: headers() });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API error ${res.status}: ${text || res.statusText}`);
  }
  return res.json();
}

export async function searchExercises(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return [];
  return safeFetch(`${BASE_URL}/exercises/name/${encodeURIComponent(q)}`);
}

export async function getExercisesByBodyPart(bodyPart) {
  return safeFetch(`${BASE_URL}/exercises/bodyPart/${encodeURIComponent(bodyPart)}`);
}

export async function getBodyParts() {
  return safeFetch(`${BASE_URL}/exercises/bodyPartList`);
}