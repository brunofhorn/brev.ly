export function normalizeHttpUrl(raw: string) {
  const s = (raw ?? "").trim();
  if (!s) return s;

  const l = s.toLowerCase();
  if (l.startsWith("http://") || l.startsWith("https://")) return s;
  if (l.startsWith("www.")) return `http://${s}`;
  return `http://${s}`;
}

export function isHttpPublicUrl(s: string) {
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;

    const host = u.hostname;

    const hasTld = /\.[a-z]{2,}$/i.test(host);
    return hasTld;
  } catch {
    return false;
  }
}
