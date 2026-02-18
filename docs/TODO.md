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

☐ 4️⃣ Create Session Engine (Pure + Tested)
Write Tests First

Test Cases

☐ createSession initializes queue

☐ markCorrect removes card

☐ markWrong moves card to end

☐ Session ends when queue empty

☐ No state mutation

Acceptance Criteria

All tests pass

100% coverage on studyEngine

ESLint passes

No React dependency

☐ 5️⃣ Add Statistics Logic (Pure + Tested)

Create:

updateStats

calculateAccuracy

Tests First

☐ Correct increments correctCount

☐ Wrong increments incorrectCount

☐ Accuracy correct

☐ Zero division safe

Acceptance Criteria

Fully unit tested

No lint warnings

No mutation

🟡 Phase 2 — Study UI Integration (Minimal Testing)
☐ 6️⃣ Build Flashcard Component

Tasks

☐ Display French word

☐ Flip to German

☐ Show buttons after flip

Acceptance Criteria

Manual verification passes

No React hook lint errors

No unused state

☐ 7️⃣ Integrate Study Engine with React State

Tasks

☐ Connect engine to reducer/useState

☐ Implement session completion

☐ Ensure wrong cards repeat

Acceptance Criteria

Study flow works manually

ESLint shows no hook dependency issues

No console warnings

🟡 Phase 3 — Category Filtering (Light Testing)
☐ 8️⃣ Implement Category Filtering

Create pure function:
filterCardsByCategory

Tests First

☐ Returns correct subset

☐ "all" returns all cards

☐ Unknown category safe

Acceptance Criteria

Logic tested

UI verified manually

No lint warnings

🟠 Phase 4 — Quiz Logic (Test Carefully)
☐ 9️⃣ Multiple Choice Generator (Pure + Tested)

Create:
generateMultipleChoiceOptions

Tests First

☐ Exactly 3 options

☐ Exactly 1 correct

☐ No duplicates

☐ Randomized order

Acceptance Criteria

Tested repeatedly

No bias patterns

ESLint clean

☐ 🔟 Fill-in Validation (Pure + Tested)

Create:
validateAnswer

Tests First

☐ Case insensitive

☐ Strict match

☐ Trim whitespace

☐ Empty fails

Acceptance Criteria

All edge cases covered

No mutation

ESLint clean

🟠 Phase 5 — Quiz UI (Manual Testing)
☐ 1️⃣1️⃣ Build Multiple Choice Quiz UI

Acceptance Criteria

3 options rendered

Selection locks

Feedback shown

Stats update

No lint warnings

☐ 1️⃣2️⃣ Build Fill-in Quiz UI

Acceptance Criteria

Enter submits

Correct/wrong feedback

Stats accurate

No lint warnings

🟠 Phase 6 — Add Card + Persistence
☐ 1️⃣3️⃣ Add Card Validation (Pure + Tested)

Create:
validateNewCard

Tests First

☐ Empty French fails

☐ Empty German fails

☐ Category required

☐ Valid passes

☐ 1️⃣4️⃣ Implement localStorage Wrapper

Create:

saveCards

loadCards

Minimal Tests

☐ Save works

☐ Load works

☐ Handles empty storage

Acceptance Criteria

No runtime crash

JSON parse guarded

ESLint clean

☐ 1️⃣5️⃣ Add Card UI

Acceptance Criteria

Form validates

Card persists after reload

No duplicate IDs

No lint warnings

🔴 Phase 7 — Polish
☐ 1️⃣6️⃣ Add Smooth Flip Animation

Manual verification only.

☐ 1️⃣7️⃣ Accessibility Improvements

Manual checks:

☐ Keyboard navigation

☐ Enter submits

☐ Focus visible

🎯 Final Definition of Done

You are done when:

☐ All pure logic fully unit tested

☐ Study engine 100% covered

☐ Quiz logic covered

☐ Validation covered

☐ ESLint passes with zero errors

☐ No React hook warnings

☐ No TypeScript errors

☐ App works end-to-end
