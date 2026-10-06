# React Todo List

A Todo List application built with **React, TypeScript, and Vite**.

## Features

- Add todos with priority and due date
- Edit todos in place
- Delete todos with confirmation
- Mark todos as completed
- Filter by All, Active, and Completed
- Filter by priority
- Sort by created date, priority, or due date
- Live search
- Persist todos using localStorage
- Display total and completed counts
- Empty state when no todos match the filters
- Responsive user interface

## React Concepts Used

This project demonstrates:

- React components
- Props
- `useState`
- `useEffect`
- Effect cleanup
- Controlled forms
- Event handling
- Lifting state up
- `useRef`
- `useMemo`
- `useCallback`

## Project Structure

```text
src/
├── components/
│   ├── TodoFilters.tsx
│   ├── TodoForm.tsx
│   └── TodoItem.tsx
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

## Validation

The project was checked with:

```bash
pnpm exec tsc --noEmit
pnpm lint
```

TypeScript compilation passes and Oxlint reports zero warnings and zero errors.

The application stores Todo data in browser `localStorage`, so todos remain available after refreshing the page.