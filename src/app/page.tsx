import MovieBoxRail from "@/modules/catalog/components/movie-box-rail/MovieBoxRail";
import { MovieGrid } from "@/modules/catalog/components/movie-grid/MovieGrid";
import TrendingRail from "@/modules/catalog/features/trending/TrendingRail";

export default function Home() {
  return (
    <div>
      <MovieBoxRail items={10} />
      <MovieGrid movies={[]} header="Recommended for you" />
    </div>
  );
}
