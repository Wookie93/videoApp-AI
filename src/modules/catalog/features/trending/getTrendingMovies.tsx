import { db } from "@/shared/db";
import { movies } from "@/shared/db/schema";
import { eq, desc } from "drizzle-orm";
import { cache } from "react";


export const getTrendingMovies = cache(async () => {
    const trendingMovies = await db.query.movies.findMany({
        where: eq(movies.isTrending, true),
        orderBy: [desc(movies.year)],
        limit: 10,
    });

    return trendingMovies;
});