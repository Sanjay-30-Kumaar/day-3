import TodoItem from "./TodoItem";
import type { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  totalTodos: number;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, title: string) => void;
}

function TodoList({
  todos,
  totalTodos,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <p>
        {totalTodos === 0
          ? "No todos yet. Add your first todo."
          : "No todos match your current filters."}
      </p>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleComplete={onToggleComplete}
          onDeleteTodo={onDeleteTodo}
          onUpdateTodo={onUpdateTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;