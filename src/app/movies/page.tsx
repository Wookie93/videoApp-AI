import CategoryGrid from "@/modules/catalog/features/category/categoryGrid";
import { CategoryName } from "@/modules/catalog/types";

export default function MoviesPage() {
    return (
        <CategoryGrid type={CategoryName.Movie} />
    );
}