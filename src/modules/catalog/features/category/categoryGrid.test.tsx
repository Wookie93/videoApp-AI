import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CategoryGrid from './categoryGrid';
import { getCategoryData } from './getCategoryData';
import { CategoryName } from '../../types';

// Mock the Data Fetching (Server Action/Service)
vi.mock('./getCategoryData', () => ({
    getCategoryData: vi.fn(),
}));

// Mock the Child Component (Isolation)
vi.mock('../../components/movie-grid/MovieGrid', () => ({
    MovieGrid: ({ movies, header }: { movies: any[]; header?: string }) => (
        <div data-testid="mock-movie-grid">
            {`Header: ${header}, Count: ${movies?.length}`}
        </div>
    ),
}));

describe('CategoryGrid (RSC)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the grid when movies are returned', async () => {
        // Arrange
        const mockMovies = [
            { id: '1', title: 'Movie 1', category: 'Movie' },
            { id: '2', title: 'Movie 2', category: 'Movie' },
        ];
        (getCategoryData as ReturnType<typeof vi.fn>).mockResolvedValue(mockMovies);

        // Act
        const jsx = await CategoryGrid({ type: CategoryName.Movie });
        render(jsx);

        // Assert
        expect(screen.getByTestId('mock-movie-grid')).toBeInTheDocument();
        expect(screen.getByText('Header: Movie, Count: 2')).toBeInTheDocument();
    });

    it('renders the grid with TV Series category', async () => {
        // Arrange
        const mockTvSeries = [
            { id: '1', title: 'Series 1', category: 'TV Series' },
            { id: '2', title: 'Series 2', category: 'TV Series' },
            { id: '3', title: 'Series 3', category: 'TV Series' },
        ];
        (getCategoryData as ReturnType<typeof vi.fn>).mockResolvedValue(mockTvSeries);

        // Act
        const jsx = await CategoryGrid({ type: CategoryName.TVSeries });
        render(jsx);

        // Assert
        expect(screen.getByTestId('mock-movie-grid')).toBeInTheDocument();
        expect(screen.getByText('Header: TV Series, Count: 3')).toBeInTheDocument();
    });

    it('passes the correct category type to getCategoryData', async () => {
        // Arrange
        (getCategoryData as ReturnType<typeof vi.fn>).mockResolvedValue([]);

        // Act
        await CategoryGrid({ type: CategoryName.Movie });

        // Assert
        expect(getCategoryData).toHaveBeenCalledWith({ type: CategoryName.Movie });
    });

    it('renders empty grid when no movies are returned', async () => {
        // Arrange
        (getCategoryData as ReturnType<typeof vi.fn>).mockResolvedValue([]);

        // Act
        const jsx = await CategoryGrid({ type: CategoryName.Movie });
        render(jsx);

        // Assert
        expect(screen.getByTestId('mock-movie-grid')).toBeInTheDocument();
        expect(screen.getByText('Header: Movie, Count: 0')).toBeInTheDocument();
    });
});
