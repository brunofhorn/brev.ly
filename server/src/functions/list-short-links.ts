import { db } from "@/db/client";
import { links } from "@/db/schema";
import { Either, makeRight } from "@/shared/either";
import { LinkResponse } from "@/types/links";
import { desc } from "drizzle-orm";

export async function listShortLinks(opts: {
  page?: number;
  perPage?: number;
}): Promise<Either<never, LinkResponse>> {
  const page = Math.max(1, opts.page ?? 1);
  const perPage = Math.min(100, Math.max(1, opts.perPage ?? 20));
  const offset = (page - 1) * perPage;

  const items = await db
    .select()
    .from(links)
    .orderBy(desc(links.createdAt))
    .limit(perPage)
    .offset(offset);

  const totalResult = await db.$count(links);

  return makeRight({ items, page, perPage, total: totalResult });
}
