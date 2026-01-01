import { Skeleton } from "@/components/ui/skeleton";
import { Heart } from "lucide-react";

interface MovieBoxProps {
    type: string;
    inView?: boolean;
    movie?: any;
}

export function MovieBox({ type, inView = true, movie }: MovieBoxProps) {
    if (!movie) return null;
    const { title, year, category, rating, thumbnail } = movie;

    return (
        <div
            className={`
                relative
                ${type === 'slider' ? 'aspect-[2/1]' : 'aspect-[1.5/1]'}
                transition-opacity duration-300
                ${inView ? 'opacity-100' : 'opacity-30'}
            `}
        >
            {/* Bookmark Button */}
            <button
                className="
                    absolute top-2 right-2 z-10
                    w-8 h-8 rounded-full
                    flex items-center justify-center
                    bg-gray-900/50 text-white
                    hover:bg-white hover:text-gray-900
                    transition-colors duration-200
                    cursor-pointer
                "
                aria-label="Add to bookmarks"
            >
                <Heart className="w-4 h-4" />
            </button>

            <Skeleton className="w-full h-full" />
            <div>
                <div>
                    <span>{year}</span>
                    <span>{category}</span>
                    <span>{rating}</span>
                </div>
                <p>{title}</p>
            </div>
        </div>
    )
}