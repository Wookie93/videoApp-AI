import { MovieGrid } from "../../components/movie-grid/MovieGrid"
import { getRecommended } from "./getRecommended"

const RecommendedGrid = async () => {
    const recommendedMovies = await getRecommended();

    return (
        <MovieGrid header="Recommended for you" movies={recommendedMovies} />
    )
}

export default RecommendedGrid
