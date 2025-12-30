import { MovieBox } from "../MovieBox";

interface MovieGridProps {
    movies: any[]; // Temporary type until we have the real Movie type
    header?: string;
}

export function MovieGrid({ movies, header }: MovieGridProps) {
    // Temporary 12 mock items
    const mockMovies = Array.from({ length: 12 });

    return (
        <section className="py-8">
            <h2>{header}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {mockMovies.map((_, index) => (
                    <MovieBox key={index} type="grid" />
                ))}
            </div>
        </section>
    );
}
