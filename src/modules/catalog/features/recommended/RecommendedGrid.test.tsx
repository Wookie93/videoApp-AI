import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import RecommendedGrid from './RecommendedGrid';
import { getRecommended } from './getRecommended';

// Mock Data Fetching
vi.mock('./getRecommended', () => ({
    getRecommended: vi.fn(),
}));

// Mock Child Component (Isolation)
vi.mock('../../components/movie-grid/MovieGrid', () => ({
    MovieGrid: ({ header, movies }: { header: string; movies: any[] }) => (
        <div data-testid="mock-movie-grid">
            <span>{header}</span>
            <span>{`Count: ${movies?.length}`}</span>
        </div>
    ),
}));

describe('RecommendedGrid (RSC)', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders MovieGrid with correct props when movies are returned', async () => {
        // Arrange
        const mockMovies = [{ id: 1, title: 'Recommended 1' }, { id: 2, title: 'Recommended 2' }];
        (getRecommended as any).mockResolvedValue(mockMovies);

        // Act
        const jsx = await RecommendedGrid();
        render(jsx);

        // Assert
        expect(screen.getByTestId('mock-movie-grid')).toBeInTheDocument();
        expect(screen.getByText('Recommended for you')).toBeInTheDocument();
        expect(screen.getByText('Count: 2')).toBeInTheDocument();
    });

    it('renders MovieGrid even if empty array is returned', async () => {
        // Arrange
        (getRecommended as any).mockResolvedValue([]);

        // Act
        const jsx = await RecommendedGrid();
        render(jsx);

        // Assert
        expect(screen.getByTestId('mock-movie-grid')).toBeInTheDocument();
        expect(screen.getByText('Count: 0')).toBeInTheDocument();
    });
});
