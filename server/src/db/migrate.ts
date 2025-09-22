import 'dotenv/config';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, pg } from './client';

(async () => {
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migrations applied');
  } finally {
    await pg.end();
  }
})();