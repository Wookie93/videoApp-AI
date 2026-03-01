import { MovieBoxRail } from "../../components/movie-box-rail/MovieBoxRail";
import { getTrendingMovies } from "./getTrendingMovies"

export const TrendingRail = async () => {

    const trendingMovies = await getTrendingMovies();
    if (!trendingMovies) return null;

    return (
        <MovieBoxRail movies={trendingMovies} items={trendingMovies.length} />
    )
}

