
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "./schema";

/**
 * The Drizzle database client.
 * Returns `null` when DATABASE_URL is not configured,
 * allowing feature queries to fall back to the fake-db service.
 */
export const db = process.env.DATABASE_URL
    ? drizzle(new Pool({ connectionString: process.env.DATABASE_URL }), { schema })
    : null;
