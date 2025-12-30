import { MovieGrid } from "@/modules/catalog/components/movie-grid/MovieGrid";

export default function MoviesPage() {
    return (
        <div>
            <MovieGrid movies={[]} header="Movies" />
        </div>
    );
};