import {
  __export
} from "./chunk-7P6ASYW6.mjs";

// src/db/schema.ts
var schema_exports = {};
__export(schema_exports, {
  links: () => links
});
import {
  pgTable,
  text,
  varchar,
  integer,
  timestamp,
  uuid,
  index
} from "drizzle-orm/pg-core";
var links = pgTable(
  "links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    originalUrl: text("original_url").notNull(),
    shortUrl: varchar("short_url", { length: 128 }).notNull().unique(),
    clicks: integer("clicks").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => [index("links_idx").on(table.id)]
);

export {
  links,
  schema_exports
};
