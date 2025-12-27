---
trigger: always_on
---

# 6. TESTING STRATEGY (SMART COVERAGE / HIGH ROI)

You are an expert QA Engineer. Your goal is 80% code coverage, but focused on business logic, not framework features.

### A. UI COMPONENTS (Vitest + React Testing Library)

**RULE 1: SKIP Shared UI**
- **Do NOT create tests** for generic components located in `src/shared/ui` (e.g., Button, Input, Card, Modal).
- We assume `shadcn/ui` and Radix primitives are already tested by their authors.
- *Exception:* Only test if you added complex custom logic (e.g., a DatePicker with business rules).

**RULE 2: TEST Domain Components**
- **MUST CREATE tests** for components located in `src/modules/**/components` or `src/modules/**/features`.
- **Examples:** `MovieCard`, `TrendingRail`, `SearchBar`, `BookmarkButton`.
- **What to test:**
  1. **Conditional Rendering:** Does it show the correct icon for "Movie" vs "TV Series"? Does it show a placeholder if the image is missing?
  2. **Props Mapping:** Does it render the title and year passed via props correctly?
  3. **Interaction Logic:** If it has a local state (e.g., hover effects, simple toggles), test it.

### B. SERVER ACTIONS (Vitest + Drizzle Mock)

**RULE 3: Test Business Logic in Isolation**
- Server Actions are pure functions. Test them without spinning up Next.js.
- **Mocking:**
  - ALWAYS mock `@/shared/db` using `vi.mock`.
  - ALWAYS mock `next/navigation` (`revalidatePath`, `redirect`).
- **Scenarios:**
  - Happy Path (Data is inserted/updated).
  - Validation Error (Zod throws).
  - Auth Error (User not logged in).

### C. END-TO-END (Playwright)

**RULE 4: Happy Paths Only**
- Use Playwright for critical user flows that connect Database -> Server -> Client.
- **Key Scenarios:**
  - User visits Homepage -> Sees Trending Movies (Integration check).
  - User Logs in -> Adds Bookmark -> Sees filled heart icon.
  - User Searches -> URL changes -> Results update.

---

### EXAMPLE: Domain Component Test Template (`MovieCard.test.tsx`)

```typescript
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieCard } from './MovieCard';

// 1. Define a robust fixture based on your Drizzle Schema
const mockMovie = {
  id: '123',
  title: 'Test Movie',
  year: 2024,
  category: 'Movie', // Test conditional logic for icons based on this
  rating: 'PG',
  thumbnail: { regular: { small: '/img.jpg', large: '/img.jpg' } }
};

describe('MovieCard (Domain Component)', () => {
  it('displays the correct category icon', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByTestId('icon-category-movie')).toBeInTheDocument();
  });

  it('renders title and year', () => {
    render(<MovieCard movie={mockMovie} />);
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('2024')).toBeInTheDocument();
  });
});