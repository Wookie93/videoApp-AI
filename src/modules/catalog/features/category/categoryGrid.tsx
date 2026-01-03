import { MovieGrid } from "../../components/movie-grid/MovieGrid";
import { getCategoryData } from "./getCategoryData";
import { CategoryName } from "../../types";

const CategoryGrid = async ({ type }: { type: CategoryName }) => {

    const categoryData = await getCategoryData({ type });
    if (!categoryData) return null;
    return (
        <MovieGrid movies={categoryData} header={type} />
    )
}

export default CategoryGrid
