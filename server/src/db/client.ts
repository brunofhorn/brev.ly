import { env } from "@/lib/env";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "./schema";

export const pg = postgres(env.DATABASE_URL, {
  ssl: "require",
});

export const db = drizzle(pg, { schema });
