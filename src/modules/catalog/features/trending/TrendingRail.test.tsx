import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import TrendingRail from './TrendingRail';
import { getTrendingMovies } from './getTrendingMovies';

// Mock the Data Fetching (Server Action/Service)
vi.mock('./getTrendingMovies', () => ({
    getTrendingMovies: vi.fn(),
}));

// Mock the Child Component (Isolation)
vi.mock('../../components/movie-box-rail/MovieBoxRail', () => ({
    default: ({ movies, items }: { movies: any[]; items: number }) => (
        <div data-testid="mock-movie-rail">
            {`Count: ${movies?.length}, Limit: ${items}`}
        </div>
    ),
}));

describe('TrendingRail (RSC)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders the rail when movies are returned', async () => {
        // Arrange
        const mockMovies = [{ id: 1, title: 'Movie 1' }, { id: 2, title: 'Movie 2' }];
        (getTrendingMovies as any).mockResolvedValue(mockMovies);

        // Act
        // Since TrendingRail is an async RSC, we await it directly to get the JSX
        const jsx = await TrendingRail();
        render(jsx);

        // Assert
        expect(screen.getByTestId('mock-movie-rail')).toBeInTheDocument();
        expect(screen.getByText('Count: 2, Limit: 2')).toBeInTheDocument();
    });

    it('renders null (nothing) when no movies are returned', async () => {
        // Arrange
        (getTrendingMovies as any).mockResolvedValue(null);

        // Act
        const jsx = await TrendingRail();
        // rendering null is valid, container should be empty
        const { container } = render(jsx);

        // Assert
        expect(container).toBeEmptyDOMElement();
    });

    it('passes the correct movies data to the child component', async () => {
        // Arrange
        const mockMovies = Array(5).fill({ id: 'test' });
        (getTrendingMovies as any).mockResolvedValue(mockMovies);

        // Act
        const jsx = await TrendingRail();
        render(jsx);

        // Assert
        expect(screen.getByText('Count: 5, Limit: 5')).toBeInTheDocument();
    });
});
