import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '../src/shared/db/schema';
import data from '../src/data.json';

if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is missing from environment variables');
}

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

async function main() {
    console.log('Seeding database...');

    try {
        if (!Array.isArray(data)) {
            throw new Error('src/data.json is not an array');
        }

        console.log('Clearing existing bookmarks...');
        await db.delete(schema.bookmarks);

        console.log('Clearing existing movies...');
        await db.delete(schema.movies);

        console.log(`Inserting ${data.length} movies...`);

        await db.insert(schema.movies).values(data as any);

        console.log('Seed completed successfully');
    } catch (error) {
        console.error('Seed failed:', error);
        process.exit(1);
    } finally {
        await pool.end();
    }
}

main();