import { api } from "@/lib/api";
import type { LinksFormCreateValues } from "@/schemas/links-create-form";
import type { ILink } from "@/types/links";

export async function createShortLink(link: LinksFormCreateValues) {
  const res = await fetch("/api/link", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(link),
  });

  if (!res.ok) {
    throw new Error("Falha ao criar a rede social.");
  }

  const created = (await res.json()) as ILink;

  return created;
}

export async function deleteShortLink(id: string) {
  const res = await fetch(`/api/link/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res;
}

export async function getOriginalLinkBySlug(
  slug: string
): Promise<{ originalUrl: string }> {
  const { data } = await api.get<{ originalUrl: string }>(`/links/${slug}`);
  return data;
}
