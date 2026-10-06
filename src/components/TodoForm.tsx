import { useState } from "react";
import type { FormEvent } from "react";
import type { Priority, Todo } from "../types/todo";
import { generateTodoId } from "../utils/todoUtils";

interface TodoFormProps {
  onAddTodo: (todo: Todo) => void;
}

function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [dueDate, setDueDate] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      setError("Please enter a todo title.");
      return;
    }

    setError("");

    const newTodo: Todo = {
      id: generateTodoId(),
      title: trimmedTitle,
      completed: false,
      priority,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    onAddTodo(newTodo);

    setTitle("");
    setPriority("medium");
    setDueDate("");
  };

  const handleTitleChange = (value: string) => {
    setTitle(value);

    if (error && value.trim()) {
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="todo-title">Todo</label>

        <input
          id="todo-title"
          type="text"
          value={title}
          onChange={(event) => handleTitleChange(event.target.value)}
          placeholder="What needs to be done?"
          aria-invalid={Boolean(error)}
          aria-describedby={error ? "todo-title-error" : undefined}
        />

        {error && (
          <p id="todo-title-error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="todo-priority">Priority</label>

        <select
          id="todo-priority"
          value={priority}
          onChange={(event) =>
            setPriority(event.target.value as Priority)
          }
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div>
        <label htmlFor="todo-due-date">Due date</label>

        <input
          id="todo-due-date"
          type="date"
          value={dueDate}
          onChange={(event) => setDueDate(event.target.value)}
        />
      </div>

      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;