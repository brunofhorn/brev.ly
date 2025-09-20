import {
  getOriginalUrlByShortUrlSchema
} from "./chunk-C4PKFTRR.mjs";
import {
  ShortLinkNotFoundError
} from "./chunk-TNVOXIU4.mjs";
import {
  makeLeft,
  makeRight
} from "./chunk-7HFJ4A6Z.mjs";
import {
  incrementClickCountById
} from "./chunk-ICK4IRWN.mjs";
import {
  db
} from "./chunk-HA36QCVT.mjs";
import {
  links
} from "./chunk-K4F4GMEW.mjs";

// src/functions/get-original-url-by-short-url.ts
import { eq } from "drizzle-orm";
async function getOriginalUrlByShortUrl(data) {
  const { shortUrl } = getOriginalUrlByShortUrlSchema.parse(data);
  const result = await db.select().from(links).where(eq(links.shortUrl, shortUrl));
  if (result.length === 0) {
    return makeLeft(new ShortLinkNotFoundError());
  }
  const link = result[0];
  void incrementClickCountById(link.id);
  return makeRight({ originalUrl: link.originalUrl });
}

export {
  getOriginalUrlByShortUrl
};
