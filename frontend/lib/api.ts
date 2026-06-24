const BASE_URL = "http://127.0.0.1:8000/api"; // Sesuaikan dengan port Django kamu

// Fetch Data Profile
export async function getProfile() {
  const res = await fetch(`${BASE_URL}/profile/`);
  if (!res.ok) throw new Error("Gagal mengambil data Profile");
  return res.json();
}

// Fetch Data Experience
export async function getExperiences() {
  const res = await fetch(`${BASE_URL}/experiences/`);
  if (!res.ok) throw new Error("Gagal mengambil data Experience");
  return res.json();
}

// Fetch Data Skills
export async function getSkills() {
  const res = await fetch(`${BASE_URL}/skills/`);
  if (!res.ok) throw new Error("Gagal mengambil data Skills");
  return res.json();
}

export async function getProjects() {
  const res = await fetch(`${BASE_URL}/projects/`);
  if (!res.ok) {
    throw new Error("Gagal mengambil data project");
  }
  return res.json();
}

// Fetch Data Certifications
export async function getCertifications() {
  const res = await fetch(`${BASE_URL}/certifications/`);
  if (!res.ok) throw new Error("Gagal mengambil data Certifications");
  return res.json();
}
