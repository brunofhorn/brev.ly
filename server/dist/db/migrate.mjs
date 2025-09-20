import {
  db,
  pg
} from "../chunk-HA36QCVT.mjs";
import "../chunk-MMVDJLD3.mjs";
import "../chunk-K4F4GMEW.mjs";
import "../chunk-7P6ASYW6.mjs";

// src/db/migrate.ts
import "dotenv/config";
import { migrate } from "drizzle-orm/postgres-js/migrator";
(async () => {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migrations applied");
  } finally {
    await pg.end();
  }
})();
