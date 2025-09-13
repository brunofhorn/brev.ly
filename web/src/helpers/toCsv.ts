import type { ILink } from "@/types/links";
import { escapeCsvCell } from "./escapeCsvCell";

export function toCsv(rows: ILink[], baseUrl: string) {
  const header = ["id", "shortUrl", "target", "clicks"].join(",");
  const body = rows
    .map((r) =>
      [
        escapeCsvCell(r.id),
        escapeCsvCell(`${baseUrl}${r.shortUrl}`),
        escapeCsvCell(r.originalUrl),
        r.clicks,
      ].join(",")
    )
    .join("\n");
  return `${header}\n${body}`;
}
