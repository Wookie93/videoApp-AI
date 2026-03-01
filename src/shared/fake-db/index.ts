import { Movie } from "@/modules/catalog/types";
import { CategoryName } from "@/modules/catalog/types";
import rawData from "@/lib/fake-database/data.json";

/**
 * Typed in-memory fake database seeded from data.json.
 * Used as a fallback when the real Supabase/PostgreSQL DB is unreachable.
 */
const allMovies: Movie[] = (rawData as Array<Omit<Movie, "id">>).map(
    (item, index) => ({
        id: String(index + 1),
        ...item,
    })
);

export const fakeDb = {
    /** Returns trending movies (isTrending === true), max 10. */
    getTrending: (): Movie[] =>
        allMovies.filter((m) => m.isTrending === true).slice(0, 10),

    /** Returns all movies. */
    getAll: (): Movie[] => allMovies,

    /** Returns movies filtered by category. */
    getByCategory: (type: CategoryName): Movie[] =>
        allMovies.filter((m) => m.category === type),
};
