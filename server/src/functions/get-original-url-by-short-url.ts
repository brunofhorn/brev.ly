import { eq } from "drizzle-orm";
import { type Either, makeLeft, makeRight } from "@/shared/either";
import {
  getOriginalUrlByShortUrlSchema,
  GetOriginalUrlByShortUrlValues,
} from "@/schemas/get-original-url-by-short-url.schema";
import { ShortLinkNotFoundError } from "@/errors/short-link-not-found.error";
import { db } from "@/db/client";
import { links } from "@/db/schema";

export async function getOriginalUrlByShortUrl(
  data: GetOriginalUrlByShortUrlValues
): Promise<Either<ShortLinkNotFoundError, { originalUrl: string }>> {
  const { shortUrl } = getOriginalUrlByShortUrlSchema.parse(data);

  const result = await db
    .select()
    .from(links)
    .where(eq(links.shortUrl, shortUrl));

  if (result.length === 0) {
    return makeLeft(new ShortLinkNotFoundError());
  }

  const link = result[0];

  return makeRight({ originalUrl: link.originalUrl });
}
