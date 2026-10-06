# Day 3 — React Todo List

A responsive Todo List application built with **React, TypeScript, and Vite**.

This project demonstrates React fundamentals including components, props, state, effects, controlled forms, event handling, lifting state up, `useRef`, `useMemo`, and `useCallback`.

## Features

- Add new todos
- Edit todos in place
- Delete todos with confirmation
- Mark todos as completed
- Filter by:
  - All
  - Active
  - Completed
- Filter by priority:
  - All
  - High
  - Medium
  - Low
- Sort by:
  - Created date
  - Priority
  - Due date
- Live todo search
- Due dates
- Total todo count
- Completed todo count
- Empty state
- Persistent data using `localStorage`
- Responsive layout
- TypeScript strict mode
- ESLint/Oxlint validation

## Tech Stack

- React
- TypeScript
- Vite
- CSS
- pnpm
- localStorage

## React Concepts Demonstrated

### Components

The application is divided into reusable components instead of keeping everything inside `App.tsx`.

Example component structure:

```text
src/
├── components/
│   ├── TodoForm.tsx
│   ├── TodoFilters.tsx
│   ├── TodoItem.tsx
│   ├── TodoList.tsx
│   └── TodoStats.tsx
├── hooks/
│   └── useLocalStorage.ts
├── types/
│   └── todo.ts
├── utils/
│   └── todoUtils.ts
├── App.tsx
├── App.css
├── index.css
└── main.tsx
```

### State

React state is used for:

- Todo data
- Search text
- Status filter
- Priority filter
- Sort option
- Form state
- Editing state

### `useEffect`

`useEffect` is used inside the localStorage hook to synchronize todo state with browser storage.

The effect has controlled dependencies to avoid unnecessary or infinite updates.

### `useRef`

`useRef` is used during inline editing to automatically focus the edit input.

### `useMemo`

`useMemo` is used to calculate the filtered, searched, and sorted todo list without recalculating the derived list unnecessarily.

### `useCallback`

`useCallback` is used for todo event handlers passed to child components.

## Local Storage

Todos are stored in the browser's local storage.

The application restores saved todos when the page is refreshed, so todo data is not lost during a normal browser refresh.

## Running the Project

Install dependencies:

```bash
pnpm install
```

Start the development server:

```bash
pnpm dev
```

The application will be available at the local Vite URL shown in the terminal.

## Validation

TypeScript:

```bash
pnpm exec tsc --noEmit
```

Lint:

```bash
pnpm lint
```

The project should pass both checks with zero errors and warnings.

## Build

To create a production build:

```bash
pnpm build
```

To preview the production build locally:

```bash
pnpm preview
```

## Deployment

The application is designed to be deployed using Vercel.

Production deployment:

```text
Vercel
``