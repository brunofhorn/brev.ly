import { db } from "@/db/client";
import { links } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function incrementClickCountById(id: string): Promise<void> {
  await db
    .update(links)
    .set({ clicks: sql`${links.clicks} + 1` })
    .where(eq(links.id, id))
    .execute()
    .catch((err) => {
      console.error("Failed to increment clicks:", err);
    });
}
