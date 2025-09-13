export function normalizeHttpUrl(raw: string) {
  const s = (raw ?? "").trim();
  if (!s) return s;

  const l = s.toLowerCase();
  if (l.startsWith("http://") || l.startsWith("https://")) return s;
  if (l.startsWith("www.")) return `http://${s}`;
  return `http://${s}`;
}

/** http/https + host com TLD (.com, .br, .com.br, etc.) */
export function isHttpPublicUrl(s: string) {
  try {
    const u = new URL(s);
    if (u.protocol !== "http:" && u.protocol !== "https:") return false;

    const host = u.hostname; // sem porta
    // exige pelo menos um ponto e TLD com 2+ letras (permite .com.br, .dev, .io...)
    const hasTld = /\.[a-z]{2,}$/i.test(host);
    return hasTld;
  } catch {
    return false;
  }
}
