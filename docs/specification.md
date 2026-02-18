📘 Software Requirements Specification
French Flashcards Web Application

Tech Stack: TypeScript + Vite + React
Scope: Personal, browser-based learning tool

1. Overview
1.1 Purpose

The purpose of this application is to provide a simple, browser-based flashcard system to learn French vocabulary with German translations. The system supports interactive study sessions, quiz modes, and session-based statistics.

1.2 Scope

The application will:

Run entirely in the browser

Use browser storage (e.g., localStorage)

Support session-based learning

Not require authentication

Be designed for tablet and desktop usage

Follow React best practices and modular architecture

2. Functional Requirements
2.1 Flashcard System
FR-1: Display Card

Each card displays:

One French word (front side)

The card can be flipped to reveal:

The German translation (back side)

FR-2: Flip Interaction

User clicks/taps card to flip it

Flip animation should be smooth (CSS-based)

FR-3: Self-Assessment Buttons

After flipping a card:

Show two buttons:

✅ Correct

❌ Wrong

FR-4: Wrong Card Handling

Cards marked as "Wrong":

Must be repeated again within the same session

Added to a temporary "repeat queue"

Cards marked as "Correct":

Removed from current session queue

FR-5: Session Completion

Session ends when:

All cards have been marked "Correct" at least once in the session

2.2 Redo Mode (Weak Cards Mode)
FR-6: Redo Wrong Cards

During a session, user can choose:

"Redo Incorrect Cards"

Only cards marked wrong in current session will be shown

Reset after page refresh

2.3 Quiz / Test Mode

The application must provide two quiz types:

FR-7: Multiple Choice Mode

Display French word

Show exactly 3 answer options

Only one is correct

Options:

Must be randomly generated German words

Distractors do NOT have to come from other cards

After selecting:

Show immediate feedback

Move to next question

FR-8: Fill-in-the-Blank Mode

Display French word

User types German translation

Validation:

Case insensitive

Strict match (no typo tolerance)

Show:

Correct / Incorrect message

Correct answer if wrong

2.4 Statistics (Session-Based Only)
FR-9: Statistics Page

Display:

Total cards studied

Number correct

Number incorrect

Accuracy percentage

Session progress indicator

⚠️ Statistics reset on page reload.

2.5 Card Management
FR-10: Hardcoded Initial Data

Cards are initially stored as a static JSON/TypeScript file

FR-11: Add New Card

User can:

Add French word

Add German translation

Assign category/tag

New cards:

Persist in localStorage

Available in future sessions

2.6 Categories / Tags
FR-12: Category Support

Each card must have:

One category (string)

Example: food, animals, verbs

User must be able to:

Filter session by category

View category list

3. Non-Functional Requirements
3.1 Performance

Must load under 2 seconds

Smooth card flip animation

Instant feedback on answer

3.2 Usability

Clean, user-friendly UI

Large buttons for tablet usage

Clear typography

Minimal clutter

3.3 Accessibility

Buttons must be keyboard accessible

Inputs must support Enter key submission

High contrast text

3.4 Browser Support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari)

4. System Architecture
4.1 High-Level Architecture
React (UI Layer)
│
├── State Management (React Context or useReducer)
│
├── Session Logic Layer
│
├── Storage Layer (localStorage wrapper)
│
└── Static Data (Initial Cards)

5. Data Model
5.1 Flashcard Interface
export interface Flashcard {
  id: string;
  french: string;
  german: string;
  category: string;
}

5.2 Session State
export interface SessionState {
  currentCardId: string | null;
  remainingCards: string[];
  wrongCards: string[];
  correctCount: number;
  incorrectCount: number;
  mode: "study" | "quiz-mc" | "quiz-fill";
}

6. State Management Approach

Use:

React Context + useReducer

Reason:

Scalable

Clean separation of logic

No external dependency required

7. Folder Structure (Best Practice – Vite + React + TypeScript)
src/
│
├── app/
│   ├── App.tsx
│   ├── routes.tsx
│
├── components/
│   ├── Flashcard/
│   │   ├── Flashcard.tsx
│   │   ├── Flashcard.module.css
│   │
│   ├── Quiz/
│   ├── Statistics/
│   ├── Layout/
│
├── features/
│   ├── study/
│   │   ├── studyReducer.ts
│   │   ├── StudyPage.tsx
│   │
│   ├── quiz/
│   │   ├── QuizPage.tsx
│   │
│   ├── statistics/
│
├── data/
│   ├── initialCards.ts
│
├── hooks/
│   ├── useLocalStorage.ts
│
├── context/
│   ├── AppContext.tsx
│
├── utils/
│   ├── shuffle.ts
│   ├── generateOptions.ts
│
├── types/
│   ├── flashcard.ts
│
└── main.tsx

8. UI Requirements
8.1 Layout

Main navigation:

Study

Quiz

Statistics

Add Card

8.2 Study View

Center screen:

Large flashcard

Flip animation

Buttons below after flip

8.3 Quiz View
Multiple Choice:

Word at top

3 large buttons

Fill Mode:

Word at top

Input field

Submit button

8.4 Statistics View

Display:

Progress bar

Accuracy %

Cards completed

Wrong cards count

9. Storage Strategy

Use localStorage for:

User-added cards

Categories list

Session-only data:

Stored in React state only

10. Algorithms
10.1 Repeat Logic

When user marks "Wrong":

Add card to end of queue
Increment incorrectCount


When user marks "Correct":

Remove card from queue
Increment correctCount


Session ends when queue is empty.

10.2 Random Option Generation (MC Mode)

Take correct German word

Generate 2 random distractors

Shuffle array

Render

11. Future Enhancements (Out of Scope)

Spaced repetition (Leitner system)

Dark mode

Audio pronunciation

User accounts

Cloud sync

Import/export CSV

12. Risks & Assumptions
Assumptions

Single-user application

No persistence of session statistics

No backend required

Risks

Poor distractor quality if random words unrelated

No typo tolerance may frustrate user

localStorage size limitations (unlikely issue)

13. Success Criteria

The project is successful if:

User can complete a full session without errors

Wrong cards repeat correctly

Quiz modes function accurately

Statistics reflect session correctly

App runs smoothly on tablet and desktop
