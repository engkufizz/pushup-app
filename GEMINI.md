# 50 Pushups App - Context & Rules

## Project Overview
A progressive web application designed to guide users from 0 to 50+ consecutive pushups. The app features a dark-themed UI, structured training plans (Levels 1-9), and cloud-based progress tracking.

## Tech Stack
- **Frontend**: React (TypeScript) + Vite
- **Styling**: Vanilla CSS with CSS Variables (located in `src/styles/theme.css`)
- **Icons**: `lucide-react`
- **Backend/Database**: Supabase (PostgreSQL)
- **State Management**: React Context API (`AppContext`)
- **Build Tool**: Vite

## Architecture & Data Flow
- **User Authentication**: Handled via Supabase Auth (email/password).
- **Data Persistence**: User progress (level, history, max reps) is stored in a JSONB column `data` in the `users` table in Supabase.
- **State Synchronization**: The `AppContext` automatically syncs local state changes to Supabase.
- **Routing**: Conditional rendering within `App.tsx` (Dashboard, Workout, History, Settings).

## Coding Conventions
1.  **Components**: Use functional components with TypeScript interfaces for props.
2.  **Styling**: 
    - Use standard CSS classes.
    - Rely on CSS variables (`var(--primary-green)`, `var(--bg-dark)`) for colors.
    - Avoid inline styles where possible; prefer classes in `index.css` or `theme.css`.
3.  **Type Safety**: All data structures (WorkoutSession, UserData) must be strictly typed in `src/context/AppContext.tsx`.
4.  **Icons**: Use `lucide-react` for all iconography.

## Key Files
- **`src/utils/plans.ts`**: Contains the core workout logic (Levels 1-9). This is the "brain" of the training program.
- **`src/context/AppContext.tsx`**: Manages global state (user data, settings, auth).
- **`src/views/WorkoutView.tsx`**: Handles the active workout session (timer, set tracking).
- **`src/views/SettingsView.tsx`**: Manages user preferences (rest timer, account reset/delete).
- **`src/styles/theme.css`**: Defines the application's color palette and typography.

## Deployment
- The app is built using `npm run build` and outputs to the `dist` folder.
