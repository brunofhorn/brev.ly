import { eq, sql } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import {
  getOriginalUrlByShortUrlSchema,
  GetOriginalUrlByShortUrlValues,
} from "@/schemas/get-original-url-by-short-url.schema";
import { ShortLinkNotFoundError } from "@/errors/short-link-not-found.error";
import { db } from "@/db/client";
import { links } from "@/db/schema";
import { PartialLink } from "@/types/links";

export async function getOriginalUrlByShortUrl(
  data: GetOriginalUrlByShortUrlValues
): Promise<Either<ShortLinkNotFoundError, PartialLink>> {
  const { shortUrl } = getOriginalUrlByShortUrlSchema.parse(data);

  const result = await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.shortUrl, shortUrl))
    .returning({
      id: links.id,
      originalUrl: links.originalUrl,
      clicks: links.clicks,
    });

  if (result.length === 0) {
    return makeLeft(new ShortLinkNotFoundError());
  }

  const link = result[0];

  return makeRight(link);
}
