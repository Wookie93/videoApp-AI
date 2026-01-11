import { CategoryGrid, CategoryName } from "@/modules/catalog";


export default function MoviesPage() {
    return (
        <CategoryGrid type={CategoryName.Movie} />
    );
}