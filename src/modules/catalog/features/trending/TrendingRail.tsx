import MovieBoxRail from "../../components/movie-box-rail/MovieBoxRail";
import { getTrendingMovies } from "./getTrendingMovies"

const TrendingRail = async () => {

    const trendingMovies = await getTrendingMovies();
    if (!trendingMovies) return null;

    console.log(trendingMovies);

    return (
        <MovieBoxRail movies={trendingMovies} items={trendingMovies.length} />
    )
}

export default TrendingRail