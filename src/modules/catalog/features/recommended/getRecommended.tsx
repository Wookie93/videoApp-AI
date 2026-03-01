import { db } from "@/shared/db";
import { fakeDb } from "@/shared/fake-db";
import { movies } from "@/shared/db/schema";
import { cache } from "react";

export const getRecommended = cache(async () => {
    if (!db) return fakeDb.getAll();
    try {
        const recommendedMovies = await db.select().from(movies);
        return recommendedMovies ?? fakeDb.getAll();
    } catch {
        console.warn("[DB Fallback] getRecommended → using fake-db");
        return fakeDb.getAll();
    }
});
