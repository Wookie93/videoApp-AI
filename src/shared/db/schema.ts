
import { pgTable, text, integer, boolean, jsonb, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    year: integer("year").notNull(),
    category: text("category").notNull(), // 'Movie' | 'TV Series'
    rating: text("rating").notNull(), // 'PG', 'E', '18+'
    isTrending: boolean("is_trending").default(false),
    thumbnail: jsonb("thumbnail").notNull(), // { regular: { small, large }, ... }
});

export const bookmarks = pgTable("bookmarks", {
    userId: uuid("user_id").notNull(), // Linked to Supabase Auth
    movieId: uuid("movie_id").references(() => movies.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
    pk: primaryKey({ columns: [t.userId, t.movieId] }),
}));
