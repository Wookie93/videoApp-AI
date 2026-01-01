import { MovieBox } from "../MovieBox";

interface MovieGridProps {
    movies: any[];
    header?: string;
}

export function MovieGrid({ movies, header }: MovieGridProps) {
    console.log(movies)
    return (
        <section className="py-8">
            <h2>{header}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {movies.map((movie, index) => (
                    <MovieBox movie={movie} key={movie.id} type="grid" />
                ))}
            </div>
        </section>
    );
}
