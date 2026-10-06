import type { Priority, Todo } from "../types/todo";

export const generateTodoId = (): string => {
  return crypto.randomUUID();
};

export const getPriorityValue = (priority: Priority): number => {
  const values: Record<Priority, number> = {
    high: 3,
    medium: 2,
    low: 1,
  };

  return values[priority];
};

export const sortTodosByPriority = (todos: Todo[]): Todo[] => {
  return [...todos].sort(
    (a, b) =>
      getPriorityValue(b.priority) - getPriorityValue(a.priority),
  );
};