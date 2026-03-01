import { describe, it, expect } from "vitest";
import { fakeDb } from "./index";

// fakeDb reads from data.json via static import — no mocking needed.
// data.json has 31 total entries, 5 with isTrending === true.

describe("fakeDb service (fake-db fallback)", () => {
    describe("getTrending()", () => {
        it("returns only movies with isTrending === true", () => {
            const trending = fakeDb.getTrending();
            expect(trending.every((m) => m.isTrending === true)).toBe(true);
        });

        it("returns at most 10 results", () => {
            const trending = fakeDb.getTrending();
            expect(trending.length).toBeLessThanOrEqual(10);
        });

        it("returns a non-empty list", () => {
            const trending = fakeDb.getTrending();
            expect(trending.length).toBeGreaterThan(0);
        });
    });

    describe("getAll()", () => {
        it("returns all movies from data.json", () => {
            const all = fakeDb.getAll();
            expect(all.length).toBeGreaterThan(0);
        });

        it("assigns a string id to every movie", () => {
            const all = fakeDb.getAll();
            all.forEach((m) => {
                expect(typeof m.id).toBe("string");
                expect(m.id.length).toBeGreaterThan(0);
            });
        });

        it("each movie has required fields", () => {
            const all = fakeDb.getAll();
            all.forEach((m) => {
                expect(m).toHaveProperty("title");
                expect(m).toHaveProperty("year");
                expect(m).toHaveProperty("category");
                expect(m).toHaveProperty("rating");
                expect(m).toHaveProperty("thumbnail");
            });
        });
    });

    describe("getByCategory()", () => {
        it("returns only Movie entries when called with CategoryName.Movie", () => {
            const movies = fakeDb.getByCategory("Movie" as import("@/modules/catalog/types").CategoryName);
            expect(movies.length).toBeGreaterThan(0);
            expect(movies.every((m) => m.category === "Movie")).toBe(true);
        });

        it("returns only TV Series entries when called with CategoryName.TVSeries", () => {
            const tvSeries = fakeDb.getByCategory("TV Series" as import("@/modules/catalog/types").CategoryName);
            expect(tvSeries.length).toBeGreaterThan(0);
            expect(tvSeries.every((m) => m.category === "TV Series")).toBe(true);
        });

        it("returns empty array for unknown category", () => {
            const result = fakeDb.getByCategory("Unknown" as import("@/modules/catalog/types").CategoryName);
            expect(result).toEqual([]);
        });
    });
});
