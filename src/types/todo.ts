export type Priority = "low" | "medium" | "high";

export type StatusFilter = "all" | "active" | "completed";

export type SortOption = "createdAt" | "priority" | "dueDate";

export type PriorityFilter = Priority | "all";

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  dueDate: string;
  createdAt: string;
}