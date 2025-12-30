import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MovieGrid } from './MovieGrid';

// Mock MovieBox
vi.mock('../MovieBox', () => ({
    MovieBox: () => <div data-testid="movie-box">MovieBox</div>
}));

describe('MovieGrid', () => {
    it('renders the title', () => {
        render(<MovieGrid movies={[]} />);
        expect(screen.getByText('Recommended for you')).toBeInTheDocument();
    });

    it('renders 12 movie boxes regardless of props', () => {
        render(<MovieGrid movies={[]} />);
        expect(screen.getAllByTestId('movie-box')).toHaveLength(12);
    });
});
