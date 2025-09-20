import {
  createShortLinkSchema
} from "./chunk-DDZEG7NL.mjs";
import {
  isHttpPublicUrl,
  normalizeHttpUrl
} from "./chunk-7OCRT5TY.mjs";
import {
  PoorlyFormattedShortUrlError
} from "./chunk-GZDIIVSN.mjs";
import {
  makeLeft,
  makeRight
} from "./chunk-7HFJ4A6Z.mjs";
import {
  db
} from "./chunk-HA36QCVT.mjs";
import {
  links
} from "./chunk-K4F4GMEW.mjs";
import {
  DuplicateShortLinkError
} from "./chunk-MCU6QLB7.mjs";
import {
  InvalidOriginalUrlError
} from "./chunk-XZP6Q677.mjs";

// src/functions/create-short-link.ts
async function createShortLink(data) {
  const { originalUrl, shortUrl } = createShortLinkSchema.parse(data);
  if (!/^[a-z0-9-]+$/i.test(shortUrl)) {
    return makeLeft(new PoorlyFormattedShortUrlError());
  }
  const normalized = normalizeHttpUrl(originalUrl);
  if (!isHttpPublicUrl(normalized)) {
    return makeLeft(new InvalidOriginalUrlError());
  }
  const [created] = await db.insert(links).values({ shortUrl, originalUrl: normalized }).returning().onConflictDoNothing({ target: links.shortUrl });
  if (!created) {
    return makeLeft(new DuplicateShortLinkError());
  }
  return makeRight(created);
}

export {
  createShortLink
};
