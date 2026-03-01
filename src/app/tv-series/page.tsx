import { CategoryGrid, CategoryName } from "@/modules/catalog";


export default function TVSeriesPage() {
    return (
        <CategoryGrid type={CategoryName.TVSeries} />
    );
};