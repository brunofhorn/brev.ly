import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db, pool } from "./client";
(async () => {
    try {
        await migrate(db, { migrationsFolder: "./drizzle" });
        console.log("Migrations applied");
    }
    finally {
        await pool.end();
    }
})();
