export interface MovieThumbnail {
    trending?: {
        small: string;
        large: string;
    };
    regular: {
        small: string;
        medium: string;
        large: string;
    };
}

export interface Movie {
    id: string;
    title: string;
    year: number;
    category: string;
    rating: string;
    isTrending: boolean | null;
    thumbnail: MovieThumbnail;
}
