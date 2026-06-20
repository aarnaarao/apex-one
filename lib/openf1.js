const BASE_URL = "https://api.openf1.org/v1";

export async function getDrivers(sessionKey = "latest") {
  const res = await fetch(`${BASE_URL}/drivers?session_key=${sessionKey}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch drivers");
  return res.json();
}

export async function getLatestSession() {
  const res = await fetch(`${BASE_URL}/sessions?session_key=latest`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch session");
  const data = await res.json();
  return data[0] ?? null;
}