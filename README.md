# French-German Flashcards App

A modern flashcard application for learning French-German vocabulary with multiple study modes, quiz features, and cloud persistence.

**🚀 Live Demo:** https://fra-deu-flashcards.netlify.app

## Features

- **Study Mode**: Flip cards to learn vocabulary with self-assessment
- **Multiple Choice Quiz**: Test knowledge with 3-option multiple choice questions
- **Fill-in Quiz**: Type answers for strict validation practice
- **Statistics Dashboard**: Track progress with card counts and category breakdown
- **Add Cards**: Create custom flashcards with validation
- **Cloud Persistence**: Data saved to Supabase database with offline localStorage fallback
- **Category Filtering**: Filter cards by category across all modes
- **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Routing**: React Router v7
- **Database**: Supabase (PostgreSQL)
- **Styling**: CSS Modules
- **Testing**: Vitest + React Testing Library
- **Linting**: ESLint with strict TypeScript rules

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

Edit `.env` and add your Supabase credentials:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon/public key

4. Run development server:
```bash
npm run dev
```

Visit `http://localhost:5173`

## Deployment to Netlify

### Prerequisites
- Netlify account
- GitHub repository connected

### Steps

1. **Build the app locally** (optional, to verify):
```bash
npm run build
npm run preview
```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://app.netlify.com/)
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Add environment variables:
     - `VITE_SUPABASE_URL`: Your Supabase project URL
     - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
   - Click "Deploy site"

3. **Verify deployment**:
   - Visit your Netlify URL
   - Test all features (study, quiz, add card)
   - Verify data persists correctly

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run test` - Run tests

## Project Structure

```
src/
├── app/              # App setup and routing
├── components/       # Reusable UI components
├── context/          # React Context (AppContext)
├── data/             # Initial data
├── features/         # Feature modules
│   ├── addcard/      # Add card form
│   ├── quiz/         # Quiz pages (MC & Fill-in)
│   ├── statistics/   # Statistics page
│   └── study/        # Study mode
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
    ├── storage.ts           # localStorage wrapper
    ├── supabaseMCP.ts       # Supabase database wrapper
    ├── validateNewCard.ts   # Card validation
    └── validateAnswer.ts    # Answer validation
```

## Database Schema

The app uses a Supabase PostgreSQL database with the following table:

```sql
CREATE TABLE flashcards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  french TEXT NOT NULL,
  german TEXT NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## License

MIT
