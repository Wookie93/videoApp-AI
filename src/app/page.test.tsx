import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Home from './page';

/*
 * NOTE: According to Testing Strategy Rule #1 (SKIP Shared UI),
 * we typically don't create extensive tests for routing components in src/app/.
 * 
 * This test exists because it was explicitly requested.
 * For a production app, focus testing efforts on domain components in src/modules/features.
 */
describe('Home Page (Routing Component)', () => {
    it('renders the main content area', () => {
        render(<Home />);

        // Verify the main element is present
        const mainElement = screen.getByRole('main');
        expect(mainElement).toBeInTheDocument();
    });

    it('displays the expected text content', () => {
        render(<Home />);

        // Verify the Polish text "Główna treść" (Main content) is rendered
        expect(screen.getByText('Główna treść')).toBeInTheDocument();
    });

    it('renders without crashing', () => {
        // This is a smoke test to ensure the component can be instantiated
        const { container } = render(<Home />);
        expect(container).toBeTruthy();
    });
});
