import {
  useCallback,
  useMemo,
  useState,
} from "react";

import "./App.css";

import TodoFilters from "./components/TodoFilters";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import TodoStats from "./components/TodoStats";

import useLocalStorage from "./hooks/useLocalStorage";

import type {
  PriorityFilter,
  SortOption,
  StatusFilter,
  Todo,
} from "./types/todo";

import { getPriorityValue } from "./utils/todoUtils";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>(
    "day-3-todos",
    [],
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<StatusFilter>("all");

  const [priorityFilter, setPriorityFilter] =
    useState<PriorityFilter>("all");

  const [sortBy, setSortBy] =
    useState<SortOption>("createdAt");

  const handleAddTodo = useCallback((todo: Todo) => {
    setTodos((currentTodos) => [
      ...currentTodos,
      todo,
    ]);
  }, [setTodos]);

  const handleToggleComplete = useCallback(
    (id: string) => {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                completed: !todo.completed,
              }
            : todo,
        ),
      );
    },
    [setTodos],
  );

  const handleDeleteTodo = useCallback(
    (id: string) => {
      setTodos((currentTodos) =>
        currentTodos.filter(
          (todo) => todo.id !== id,
        ),
      );
    },
    [setTodos],
  );

  const handleUpdateTodo = useCallback(
    (id: string, title: string) => {
      setTodos((currentTodos) =>
        currentTodos.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                title,
              }
            : todo,
        ),
      );
    },
    [setTodos],
  );

  const visibleTodos = useMemo(() => {
    const normalizedSearch =
      searchTerm.trim().toLowerCase();

    const filteredTodos = todos.filter((todo) => {
      const matchesSearch =
        normalizedSearch === "" ||
        todo.title
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" &&
          !todo.completed) ||
        (statusFilter === "completed" &&
          todo.completed);

      const matchesPriority =
        priorityFilter === "all" ||
        todo.priority === priorityFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPriority
      );
    });

    return [...filteredTodos].sort((a, b) => {
      if (sortBy === "priority") {
        return (
          getPriorityValue(b.priority) -
          getPriorityValue(a.priority)
        );
      }

      if (sortBy === "dueDate") {
        if (!a.dueDate && !b.dueDate) {
          return 0;
        }

        if (!a.dueDate) {
          return 1;
        }

        if (!b.dueDate) {
          return -1;
        }

        return a.dueDate.localeCompare(
          b.dueDate,
        );
      }

      return (
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
      );
    });
  }, [
    todos,
    searchTerm,
    statusFilter,
    priorityFilter,
    sortBy,
  ]);

  const completedCount = todos.filter(
    (todo) => todo.completed,
  ).length;

  const totalCount = todos.length;

  return (
    <main>
      <h1>Todo List</h1>

      <TodoForm
        onAddTodo={handleAddTodo}
      />

      <TodoFilters
        searchTerm={searchTerm}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        sortBy={sortBy}
        onSearchChange={setSearchTerm}
        onStatusChange={setStatusFilter}
        onPriorityChange={setPriorityFilter}
        onSortChange={setSortBy}
      />

      <TodoStats
        totalCount={totalCount}
        completedCount={completedCount}
      />

      <section>
        <h2>Todos</h2>

        <TodoList
          todos={visibleTodos}
          totalTodos={totalCount}
          onToggleComplete={
            handleToggleComplete
          }
          onDeleteTodo={handleDeleteTodo}
          onUpdateTodo={handleUpdateTodo}
        />
      </section>
    </main>
  );
}

export default App;