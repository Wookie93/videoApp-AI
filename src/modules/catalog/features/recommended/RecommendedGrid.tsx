import { MovieGrid } from "../../components/movie-grid/MovieGrid"
import { getRecommended } from "./getRecommended"

export const RecommendedGrid = async () => {
    const recommendedMovies = await getRecommended();

    return (
        <MovieGrid header="Recommended for you" movies={recommendedMovies} />
    )
}
