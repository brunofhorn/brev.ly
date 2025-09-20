import {
  ShortLinkNotFoundError
} from "./chunk-TNVOXIU4.mjs";
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

// src/functions/delete-short-link.ts
import { eq } from "drizzle-orm";
async function deleteShortLink(id) {
  const result = await db.delete(links).where(eq(links.id, id)).returning();
  if (result.length === 0) {
    return makeLeft(new ShortLinkNotFoundError());
  }
  return makeRight(null);
}

export {
  deleteShortLink
};
