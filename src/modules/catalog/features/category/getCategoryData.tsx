import { cache } from "react";
import { db } from "@/shared/db";
import { movies } from "@/shared/db/schema";
import { eq } from "drizzle-orm";
import { CategoryName } from "../../types";

export const getCategoryData = cache(async ({ type }: { type: CategoryName }) => {
    const categoryData = await db.query.movies.findMany({
        where: eq(movies.category, type)
    });
    return categoryData ?? [];
})