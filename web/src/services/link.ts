// export async function getSocialNetworks() {
//   const res = await fetch("/api/social", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

import type { LinksFormCreateValues } from "@/schemas/links-create-form";
import type { ILink } from "@/types/links";

//   if (!res.ok) {
//     throw new Error("Falha ao buscar redes sociais.");
//   }

//   const data = (await res.json()) as ISocialNetwork[];

//   return data;
// }

export async function postLink(
  link: LinksFormCreateValues
) {
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

export async function deleteLink(id: string) {
  const res = await fetch(`/api/link/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  return res;
}