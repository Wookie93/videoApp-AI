# Rules
1. Modular Monolith: No cross-module deep imports (e.g. from 'src/modules/A/features/...' to 'src/modules/B').
2. Vertical Slices: Ensure UI, Actions, and Queries for a feature are colocated in one folder.
3. Server Actions: MUST NOT contain business logic. They should only validate input (Zod) and call a domain function.
4. Database: Ensure Drizzle ORM is used safely (no raw SQL injection risks).
5. Security: Look for RLS policies in Supabase and proper Zod validation.

## SPRINT 1. Basic Setup

    [x] 1.1. Environment Setup
        Create .env.local file with variables: DATABASE_URL (Supabase Transaction Pooler), NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.
        Install missing packages: npm install drizzle-orm postgres dotenv oraz npm install -D drizzle-kit tsx.

    [x] 1.2. Schema Definition
        Create src/shared/db/schema.ts
        Create src/shared/db/index.ts 

    [x] 1.3. Data Migration (Seed)
        Create scripts/seed.ts
        Run migration: npx drizzle-kit push.
        Run seed: npx tsx scripts/seed.ts.

    [x] 1.4. Supabase Setup
        Configure tables and RLS policies.   

    [x] 1.5. Global Layout & UI Kit
        Add basic layout and styles 
        navigation between pages

    [x] 1.6. AI Review 
        Create CI/CD pipline with AI agent making a PR and reviewing it. 

## SPRINT 2: Read-Only Features

    [x] 2.1. Create MovieCard component
        src/modules/catalog/components/MovieCard.tsx.

    [x] 2.2. Feature: Trending List (Slice)
        src/modules/catalog/features/trending.
        query.ts: Function getTrendingMovies() (Drizzle select).
        TrendingRail.tsx: Server component (RSC) displaying the carousel (you can use CSS scroll-snap instead of a slider library).

    [x] 2.3. Feature: Recommended List (Slice)
        src/modules/catalog/features/recommended.
        query.ts: Function getRecommendedMovies() 
        RecommendedGrid.tsx: component with grid.

    [x] 2.4. Main Page Integration
        src/app/(main)/page.tsx.

SPRINT 3: Auth
    [ ] 3.1. Auth Module Setup
        Configure Supabase Auth (Email/Password).
        Create src/modules/auth/features/login-form.
        Create src/modules/auth/features/register-form.
        Create src/app/(auth)/login/page.tsx.

    [ ] 3.2. Middleware & Session
        Add middleware.ts, which protects /bookmarks (redirect to login).
        Create utility getUserSession in src/modules/auth/lib/session.ts.

    [ ] 3.3. Feature: Toggle Bookmark (Slice)
        src/modules/user-library/features/toggle-bookmark.
        action.ts: Server Action toggleBookmarkAction(movieId). Remember to revalidatePath.
        BookmarkButton.tsx: Client Component using useOptimistic (heart icon changes immediately).

    [ ] 3.4. Feature: Bookmarked Page
        src/app/(main)/bookmarks/page.tsx.
        Fetch only movies that user has in bookmarks (JOIN in Drizzle).

SPRINT 4: Search & Filter

    [ ] 4.1. Feature: Search (Slice)
        src/modules/catalog/features/search.
        SearchInput.tsx: Input, which updates URL (?q=...) using useRouter or nuqs library (recommended).
        Use useDebounce (e.g. 300ms) to avoid router spamming.

    [ ] 4.2. Search Logic
        Update queries in query.ts in Catalog module to accept searchQuery parameter.
        Add ilike filtering in Drizzle.

    [ ] 4.3. Category Pages
        src/app/(main)/movies/page.tsx i tv-series/page.tsx.
        Use the same RecommendedGrid component, but with category filter.

SPRINT 5: Reviews & Watchlists

SPRINT 6: Polish & DevOps

    [ ] 5.1. Code Quality
        Run npx esc/eslint and fix all warnings.
        Make sure there are no any types in the code.

    [ ] 5.2. Unit Tests (Vitest) --> delagate to AI agent
        Write tests for utils (e.g. text formatting).
        Write tests for login form validation (Zod schema).

    [ ] 5.3. E2E Tests (Playwright) --> delagate to AI agent
        Configure simple test: Go to the main page -> check if the "Trending" text is present.

    [ ] 5.4. README.md
        Write documentation: Describe the Modular Monolith architecture, why Server Actions, how to run the project.
        Add database schema (mermaid diagram).

SPRINT 7: AI Features

    [ ] 6.1. Vector Search
        Goal: The user enters: ‘Something like The Matrix, but more philosophical’ -> The database performs a Cosine Similarity Search and returns ‘Ghost in the Shell’.
        