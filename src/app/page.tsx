import MovieBoxRail from "@/modules/catalog/components/movie-box-rail/MovieBoxRail";
import { MovieGrid } from "@/modules/catalog/components/movie-grid/MovieGrid";
import RecommendedGrid from "@/modules/catalog/features/recommended/RecommendedGrid";
import TrendingRail from "@/modules/catalog/features/trending/TrendingRail";

export default function Home() {
  return (
    <div>
      <TrendingRail />
      <RecommendedGrid />
    </div>
  );
}
