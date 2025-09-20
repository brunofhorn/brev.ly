import {
  env
} from "./chunk-MMVDJLD3.mjs";
import {
  schema_exports
} from "./chunk-K4F4GMEW.mjs";

// src/db/client.ts
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
var pg = postgres(env.DATABASE_URL, {
  ssl: "require"
});
var db = drizzle(pg, { schema: schema_exports });

export {
  pg,
  db
};
