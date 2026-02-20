# French-German Flashcards App

A modern flashcard application for learning French-German vocabulary. Features user accounts, multiple study modes, quiz types, card management, and cloud persistence per user.

**🚀 Live Demo:** https://fra-deu-flashcards.netlify.app

## Features

- **User Accounts**: Sign up and log in with email/password — each user's cards are private
- **Study Mode**: 3D flip cards with Wrong/Correct self-assessment
- **Multiple Choice Quiz**: Test knowledge with 3-option multiple choice questions
- **Fill-in Quiz**: Type answers for strict validation practice
- **Statistics Dashboard**: Track progress with card counts and category breakdown
- **Add Cards**: Create custom flashcards with category autocomplete and validation
- **Manage Cards**: Edit or delete cards from a dedicated management page
- **Cloud Persistence**: Cards saved to Supabase with Row Level Security per user
- **Category Filtering**: Filter cards by category across all modes
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: React Router v7
- **Auth & Database**: Supabase (PostgreSQL + Auth)
- **Styling**: CSS Modules
- **Testing**: Vitest
- **Linting**: ESLint with strict TypeScript rules
- **Deployment**: Netlify

## Setup

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/koh-suz/fra-deu-flashcards.git
cd fra-deu-flashcards
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` and fill in your Supabase credentials:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

4. Run the development server:
```bash
npm run dev
```

Visit `http://localhost:5173` and sign up for an account.

### Supabase Configuration

In the Supabase dashboard under **Authentication → URL Configuration**:

- **Site URL**: `https://your-netlify-site.netlify.app` (or `http://localhost:5173` for local dev)
- **Redirect URLs**: add `https://your-netlify-site.netlify.app/**` and `http://localhost:5173/**`

## Deployment to Netlify

1. Connect your GitHub repository to Netlify
2. Set build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
3. Add environment variables in the Netlify dashboard:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy — Netlify auto-deploys on every push to `main`

## Available Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run lint` — Run ESLint
- `npm run test` — Run tests

## Project Structure

```
src/
├── app/              # Router and app entry point
├── components/       # Reusable UI components
│   ├── ErrorToast/   # Error notification component
│   ├── Flashcard/    # 3D flip card component
│   ├── Layout/       # Navigation and page layout
│   ├── Loading/      # Loading spinner
│   └── ProtectedRoute/ # Auth route guard
├── context/          # AppContext (thin wrapper over useFlashcards)
├── data/             # Initial seed data
├── features/         # Feature modules
│   ├── auth/         # LoginPage and SignupPage
│   ├── addcard/      # Add card form
│   ├── cards/        # Card management (edit, delete)
│   ├── quiz/         # Quiz pages (MC & Fill-in)
│   ├── statistics/   # Statistics page
│   └── study/        # Study mode
├── hooks/            # Custom hooks
│   ├── useAuth.ts    # Supabase auth session management
│   └── useFlashcards.ts # Data fetching, CRUD, localStorage sync
├── lib/
│   └── supabase.ts   # Shared Supabase client singleton
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
    ├── storage.ts           # localStorage wrapper
    ├── supabaseMCP.ts       # Supabase CRUD operations
    ├── validateNewCard.ts   # Card creation validation
    └── validateAnswer.ts    # Answer validation
```

## Database Schema

```sql
CREATE TABLE public.flashcards (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  french     TEXT NOT NULL,
  german     TEXT NOT NULL,
  category   TEXT NOT NULL,
  user_id    UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security: users see only their own cards
ALTER TABLE public.flashcards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own cards"   ON public.flashcards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cards" ON public.flashcards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cards" ON public.flashcards FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cards" ON public.flashcards FOR DELETE USING (auth.uid() = user_id);
```

## License

MIT
