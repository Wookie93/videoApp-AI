import { db } from "@/shared/db";
import { movies } from "@/shared/db/schema";
import { cache } from "react";

export const getRecommended = cache(async () => {
    const recommendedMovies = await db.select().from(movies)
    return recommendedMovies ?? []
})

