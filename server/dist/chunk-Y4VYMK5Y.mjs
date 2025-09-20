import {
  makeRight
} from "./chunk-7HFJ4A6Z.mjs";
import {
  db
} from "./chunk-HA36QCVT.mjs";
import {
  links
} from "./chunk-K4F4GMEW.mjs";

// src/functions/list-short-links.ts
import { desc } from "drizzle-orm";
async function listShortLinks(opts) {
  const page = Math.max(1, opts.page ?? 1);
  const perPage = Math.min(100, Math.max(1, opts.perPage ?? 20));
  const offset = (page - 1) * perPage;
  const items = await db.select().from(links).orderBy(desc(links.createdAt)).limit(perPage).offset(offset);
  const totalResult = await db.$count(links);
  return makeRight({ items, page, perPage, total: totalResult });
}

export {
  listShortLinks
};
