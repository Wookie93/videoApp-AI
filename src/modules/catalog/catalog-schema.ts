import { pgTable, text, integer, boolean, jsonb, timestamp, uuid, primaryKey } from "drizzle-orm/pg-core";

export const movies = pgTable("movies", {
    id: uuid("id").defaultRandom().primaryKey(),
    title: text("title").notNull(),
    year: integer("year").notNull(),
    category: text("category").notNull(),
    rating: text("rating").notNull(),
    isTrending: boolean("is_trending").default(false),
    thumbnail: jsonb("thumbnail").notNull(),
});

export const bookmarks = pgTable("bookmarks", {
    userId: text("user_id").notNull(),
    movieId: uuid("movie_id").references(() => movies.id).notNull(),
    createdAt: timestamp("created_at").defaultNow(),
}, (t) => ({
    pk: primaryKey({ columns: [t.userId, t.movieId] }),
}));