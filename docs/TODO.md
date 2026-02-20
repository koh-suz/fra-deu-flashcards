🧪 Lean High-Impact TDD Implementation TODO List
French Flashcards App (TypeScript + Vite + React)

Goal:

Test logic that matters

Keep UI testing minimal

Keep code quality high

Move fast without chaos

🟢 Phase 0 — Project & Code Quality Setup
☑ 1️⃣ Initialize Project

Tasks

☑ Create Vite + React + TypeScript project

☑ Create recommended folder structure

☑ Add basic navigation layout

Acceptance Criteria

npm run dev works

Navigation renders:

Study

Quiz

Statistics

Add Card

No TypeScript errors

☑ 2️⃣ Configure ESLint (Strict but Practical)

Tasks

☑ Install ESLint + TypeScript plugin

☑ Enable React + React Hooks rules

☑ Enable recommended TypeScript rules

☑ Enable react-hooks/exhaustive-deps

☑ Add lint script (npm run lint)

☑ Fix all lint errors before proceeding

Acceptance Criteria

npm run lint runs without errors

React hook dependency warnings appear when incorrect

No unused variables

No implicit any

No warnings in console during development

🎯 ESLint is mandatory before moving forward.

☑ 3️⃣ Setup Minimal Testing Environment

Tasks

☑ Install Vitest

☑ Configure jsdom

☑ Add npm run test

☑ Add one passing example test

Acceptance Criteria

npm run test runs successfully

Test suite executes without crash

ESLint passes on test files

🟢 Phase 1 — Core Study Engine (High-Impact Testing)

This is the most important logic in your app.

Create:
src/features/study/studyEngine.ts

☑ 4️⃣ Create Session Engine (Pure + Tested)
Write Tests First

Test Cases

☑ createSession initializes queue

☑ markCorrect removes card

☑ markWrong moves card to end

☑ Session ends when queue empty

☑ No state mutation

Acceptance Criteria

All tests pass

100% coverage on studyEngine

ESLint passes

No React dependency

☑ 5️⃣ Add Statistics Logic (Pure + Tested)

Create:

updateStats

calculateAccuracy

Tests First

☑ Correct increments correctCount

☑ Wrong increments incorrectCount

☑ Accuracy correct

☑ Zero division safe

Acceptance Criteria

Fully unit tested

No lint warnings

No mutation

🟡 Phase 2 — Study UI Integration (Minimal Testing)
☑ 6️⃣ Build Flashcard Component

Tasks

☑ Display French word

☑ Flip to German

☑ Show buttons after flip

Acceptance Criteria

Manual verification passes

No React hook lint errors

No unused state

☑ 7️⃣ Integrate Study Engine with React State

Tasks

☑ Connect engine to reducer/useState

☑ Implement session completion

☑ Ensure wrong cards repeat

Acceptance Criteria

Study flow works manually

ESLint shows no hook dependency issues

No console warnings

🟡 Phase 3 — Category Filtering (Light Testing)
☑ 8️⃣ Implement Category Filtering

Create pure function:
filterCardsByCategory

Tests First

☑ Returns correct subset

☑ "all" returns all cards

☑ Unknown category safe

Acceptance Criteria

Logic tested

UI verified manually

No lint warnings

🟠 Phase 4 — Quiz Logic (Test Carefully)
☑ 9️⃣ Multiple Choice Generator (Pure + Tested)

Create:
generateMultipleChoiceOptions

Tests First

☑ Exactly 3 options

☑ Exactly 1 correct

☑ No duplicates

☑ Randomized order

Acceptance Criteria

Tested repeatedly

No bias patterns

ESLint clean

☑ 🔟 Fill-in Validation (Pure + Tested)

Create:
validateAnswer

Tests First

☑ Case insensitive

☑ Strict match

☑ Trim whitespace

☑ Empty fails

Acceptance Criteria

All edge cases covered

No mutation

ESLint clean

🟠 Phase 5 — Quiz UI (Manual Testing)
☑ 1️⃣1️⃣ Build Multiple Choice Quiz UI

Acceptance Criteria

3 options rendered

Selection locks

Feedback shown

Stats update

No lint warnings

☑ 1️⃣2️⃣ Build Fill-in Quiz UI

Acceptance Criteria

Enter submits

Correct/wrong feedback

Stats accurate

No lint warnings

☑ 1️⃣3️⃣ Build Statistics Page UI

Acceptance Criteria

Card collection stats displayed

Category breakdown with visual bars

Clean layout

No lint warnings

🟠 Phase 6 — Add Card + Persistence
☑ 1️⃣4️⃣ Add Card Validation (Pure + Tested)

Create:
validateNewCard

Tests First

☑ Empty French fails

☑ Empty German fails

☑ Category required

☑ Valid passes

☑ 1️⃣5️⃣ Implement localStorage Wrapper

Create:

saveCards

loadCards

Minimal Tests

☑ Save works

☑ Load works

☑ Handles empty storage

Acceptance Criteria

No runtime crash

JSON parse guarded

ESLint clean

☑ 1️⃣6️⃣ Add Card UI

Acceptance Criteria

Form validates

Card persists after reload

No duplicate IDs

No lint warnings

�🟠 Phase 7 — Database Integration (Supabase MCP)
☑ 1️⃣7️⃣ Setup Database Schema (Using existing "flashcards" project)

Tasks

☑ Create flashcards table schema via MCP

☑ Verify table structure

Acceptance Criteria

Table schema matches Flashcard type (id, french, german, category)

Table accessible via MCP tools

Project ID: ucptiohyuhlfgsilsvcq

☑ 1️⃣8️⃣ Create Database Wrapper Using Supabase Client

Create:
supabaseMCP.ts (wrapper using @supabase/supabase-js)

fetchCards() - async fetch from database

createCard() - async insert to database

updateCard() - optional

deleteCard() - optional

Acceptance Criteria

All CRUD operations work

Error handling for SQL errors

TypeScript types match Flashcard

No direct SQL in components

API keys secured in .env

☑ 1️⃣9️⃣ Migrate AppContext from localStorage to Supabase

Tasks

☑ Update AppContext to use Supabase wrapper

☑ Add async initialization

☑ Keep localStorage as offline fallback

☑ Migrate existing localStorage data to Supabase

☑ Add loading states to AppProvider

Acceptance Criteria

Cards load from Supabase on app start

New cards save to Supabase via MCP

Existing localStorage cards migrated

Offline fallback works

No data loss during migration

☑ 2️⃣0️⃣ Add Loading & Error States

Tasks

☑ Loading spinner for initial fetch

☑ Error messages for failed operations

☑ Retry logic for failed requests

☑ Optimistic UI updates

Acceptance Criteria

User sees loading states

Errors handled gracefully

Network failures don't crash app

Good UX during async operations

� Phase 8 — Netlify Deployment
☑ 2️⃣1️⃣ Prepare for Deployment

Tasks

☑ Create .env.example file with template variables

☑ Add deployment documentation to README

☑ Verify build works locally (npm run build)

☑ Test production build locally (npm run preview)

Acceptance Criteria

.env.example created with all required vars

Build completes without errors

Preview works correctly

No hardcoded secrets in code

☑ 2️⃣2️⃣ Deploy to Netlify

Tasks

☑ Connect GitHub repository to Netlify

☑ Configure build settings (build command: npm run build, publish dir: dist)

☑ Set environment variables in Netlify dashboard

☑ Trigger initial deployment

☑ Verify deployment success

Acceptance Criteria

Site deploys successfully

Environment variables configured

Live URL accessible

All features work in production

Database connection works

☑ 2️⃣3️⃣ Post-Deployment Verification

Tasks

☑ Test all app features on live site

☑ Verify Supabase connection works

☑ Test add card functionality

☑ Verify study/quiz modes work

☑ Check responsive design

☑ Update README with live URL

Acceptance Criteria

All features functional on live site

No console errors

Data persists correctly

App works on mobile devices

README updated with deployment URL

🟠 Phase 9 — Refactoring

☑ 2️⃣4️⃣ Fix addCard ID Mismatch (Critical Bug)

Tasks

☑ Remove temp crypto.randomUUID() from AddCardPage

☑ Change addCard to accept Omit<Flashcard, 'id'>

☑ Replace optimistic temp card in state with real Supabase card after save

☑ Fix addCard type signature from void to Promise<void>

Acceptance Criteria

Card in state has same ID as card in Supabase

No duplicate IDs after adding a card

addCard return type matches implementation

☑ 2️⃣5️⃣ Extract Custom Hook from AppContext

Tasks

☑ Create useFlashcards() hook in src/hooks/useFlashcards.ts

☑ Move all async data logic into the hook (fetch, migrate, localStorage sync)

☑ AppContext becomes thin wrapper that calls the hook

☑ Add useCallback to initializeCards to prevent recreation on every render

Acceptance Criteria

AppContext only provides state and actions

useFlashcards handles all data fetching and side effects

No ESLint hook warnings

☑ 2️⃣6️⃣ Remove Duplicate Validation in supabaseMCP.ts

Tasks

☑ Remove inline validation from createCard in supabaseMCP.ts

☑ Validation is caller's responsibility (validateNewCard already handles it)

Acceptance Criteria

No duplicate validation logic across files

validateNewCard.ts is the single source of truth for validation

☑ 2️⃣7️⃣ Add Submission Loading State to AddCard Form

Tasks

☑ Add isSubmitting state to AddCardPage

☑ Disable submit button during Supabase save

☑ Show loading indicator on button while submitting

☑ Handle and display submission errors in the form

Acceptance Criteria

Button disabled while saving

User gets visual feedback during submission

Errors from Supabase shown inline in form

☑ 2️⃣8️⃣ Move Error Toast to Own Component

Tasks

☑ Create src/components/ErrorToast/ErrorToast.tsx

☑ Create ErrorToast.module.css

☑ Remove inline styles from App.tsx

☑ Add dismiss button to error toast

Acceptance Criteria

No inline styles in App.tsx

Error toast dismissible by user

Consistent styling with rest of app

☑ 2️⃣9️⃣ Add Migration Flag

Tasks

☑ Set localStorage flag after successful migration

☑ Skip migration step if flag exists

Acceptance Criteria

Migration does not re-run on every load when Supabase is empty

Flag stored in localStorage after first successful migration

☑ 3️⃣0️⃣ Category Autocomplete

Tasks

☑ Replace free-text category input with autocomplete

☑ Show existing categories as suggestions while typing

☑ Allow typing a new category not in the list

Acceptance Criteria

Existing categories suggested as user types

New categories can still be entered freely

No inconsistent casing issues (stored lowercase)

� Phase 10 — User Authentication (Supabase Auth)

☑ 3️⃣1️⃣ Setup Supabase Auth

Tasks

☑ Enable email/password auth in Supabase project

☑ Add user_id column to flashcards table (FK to auth.users)

☑ Set up Row Level Security (RLS) — users can only access their own cards

☑ Test auth and RLS via MCP tools

Acceptance Criteria

Email/password auth enabled in Supabase

flashcards table has user_id column

RLS policy: SELECT/INSERT/UPDATE/DELETE only for card owner

Unauthenticated requests return no data

☑ 3️⃣2️⃣ Create Auth UI

Tasks

☑ Create LoginPage component

☑ Create SignupPage component

☑ Add /login and /signup routes

☑ Add logout button to navigation

Acceptance Criteria

User can sign up with email and password

User can log in with valid credentials

Errors shown for invalid credentials

Logout clears session and redirects to login

☑ 3️⃣3️⃣ Integrate Auth with App

Tasks

☑ Create useAuth() hook with Supabase session management

☑ Protect all routes — redirect to /login if not authenticated

☑ Pass user_id when creating cards

☑ Load only the authenticated user's cards on init

Acceptance Criteria

Unauthenticated users redirected to login

Cards are scoped per user

New cards saved with correct user_id

Session persists across page reload

🟠 Phase 11 — Card Management

☑ 3️⃣4️⃣ Cards Management Page

Tasks

☑ Create /cards route and CardsPage component

☑ List all cards with French, German, and category columns

☑ Add navigation link to card list

Acceptance Criteria

All cards visible in a list view

Page accessible from navigation

Cards displayed with all fields

☑ 3️⃣5️⃣ Edit Card

Tasks

☑ Add edit button per card in CardsPage

☑ Inline edit form pre-filled with card data

☑ Update card via updateCard() in Supabase

☑ Expose updateCard in useFlashcards hook and AppContext

Acceptance Criteria

User can edit French, German, and category fields

Changes saved to Supabase and reflected in state immediately

Validation applied before saving

Cancel button discards changes

☑ 3️⃣6️⃣ Delete Card

Tasks

☑ Add delete button per card in CardsPage

☑ Confirmation step before deleting

☑ Delete card via deleteCard() in Supabase

☑ Expose deleteCard in useFlashcards hook and AppContext

Acceptance Criteria

User prompted to confirm before deletion

Card removed from Supabase and local state

Button disabled after first click to prevent double-delete

🔴 Phase 12 — Polish
☐ 3️⃣7️⃣ Add Smooth Flip Animation

Manual verification only.

☐ 3️⃣8️⃣ Accessibility Improvements

Manual checks:

Study / Quiz

☐ Keyboard navigation works on flashcard

☐ Enter flips card

☐ Focus visible on all interactive elements

Auth pages (LoginPage, SignupPage)

☐ Enter submits login / signup form

☐ Error messages readable by screen readers (aria-live)

☐ Focus moves to first field on page load

CardsPage

☐ Edit and Delete buttons reachable via keyboard

☐ Focus moves into edit form when opened

☐ Focus returns to card row after cancel or save

Navigation

☐ Logout button has visible focus ring

☐ 3️⃣9️⃣ Responsive Design Check

Manual checks:

☐ Navigation does not overflow on narrow screens (tablet / mobile)

☐ Auth pages readable and usable on mobile

☐ CardsPage edit form columns stack correctly on narrow screens

☐ Study and Quiz pages usable on mobile

🎯 Final Definition of Done

You are done when:

☐ All pure logic fully unit tested

☐ Study engine 100% covered

☐ Quiz logic covered

☐ Validation covered

☐ editCard and removeCard covered in useFlashcards tests

☐ ESLint passes with zero errors

☐ No React hook warnings

☐ No TypeScript errors

☐ App works end-to-end

☐ Auth flow works on production (signup email redirects to Netlify URL)

☐ Cards are scoped per user in production
