import { cache } from "react";
import { db } from "@/shared/db";
import { fakeDb } from "@/shared/fake-db";
import { movies } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { CategoryName } from "../../types";

export const getCategoryData = cache(async ({ type }: { type: CategoryName }) => {
    if (!db) return fakeDb.getByCategory(type);
    try {
        const categoryData = await db.query.movies.findMany({
            where: eq(movies.category, type)
        });
        return categoryData ?? fakeDb.getByCategory(type);
    } catch {
        console.warn("[DB Fallback] getCategoryData → using fake-db");
        return fakeDb.getByCategory(type);
    }
});