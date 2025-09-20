import {
  db
} from "./chunk-HA36QCVT.mjs";
import {
  links
} from "./chunk-K4F4GMEW.mjs";

// src/functions/increment-click-count-by-id.ts
import { eq, sql } from "drizzle-orm";
async function incrementClickCountById(id) {
  await db.update(links).set({ clicks: sql`${links.clicks} + 1` }).where(eq(links.id, id)).execute().catch((err) => {
    console.error("Failed to increment clicks:", err);
  });
}

export {
  incrementClickCountById
};
