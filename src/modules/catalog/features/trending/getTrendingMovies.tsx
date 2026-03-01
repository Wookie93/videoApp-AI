import { db } from "@/shared/db";
import { fakeDb } from "@/shared/fake-db";
import { movies } from "@/shared/db/schema";
import { eq, desc } from "drizzle-orm";
import { cache } from "react";


export const getTrendingMovies = cache(async () => {
    if (!db) return fakeDb.getTrending();
    try {
        const trendingMovies = await db.query.movies.findMany({
            where: eq(movies.isTrending, true),
            orderBy: [desc(movies.year)],
            limit: 10,
        });
        return trendingMovies ?? fakeDb.getTrending();
    } catch {
        console.warn("[DB Fallback] getTrendingMovies → using fake-db");
        return fakeDb.getTrending();
    }
});