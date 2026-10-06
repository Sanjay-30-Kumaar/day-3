import { memo, useEffect, useRef, useState } from "react";
import type { Todo } from "../types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onUpdateTodo: (id: string, title: string) => void;
}

function TodoItem({
  todo,
  onToggleComplete,
  onDeleteTodo,
  onUpdateTodo,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing) {
      editInputRef.current?.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    const trimmedTitle = editTitle.trim();

    if (!trimmedTitle) {
      return;
    }

    onUpdateTodo(todo.id, trimmedTitle);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${todo.title}"?`,
    );

    if (confirmed) {
      onDeleteTodo(todo.id);
    }
  };

return (
  <li>
    <div className="todo-main">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        aria-label={`Mark ${todo.title} as ${
          todo.completed ? "active" : "completed"
        }`}
      />

      {isEditing ? (
        <div className="todo-edit">
          <input
            ref={editInputRef}
            type="text"
            value={editTitle}
            onChange={(event) =>
              setEditTitle(event.target.value)
            }
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSave();
              }

              if (event.key === "Escape") {
                handleCancel();
              }
            }}
            aria-label="Edit todo title"
          />

          <button type="button" onClick={handleSave}>
            Save
          </button>

          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <>
          <span
            className={
              todo.completed
                ? "todo-title completed"
                : "todo-title"
            }
          >
            {todo.title}
          </span>

          <div className="todo-meta">
            <span>Priority: {todo.priority}</span>

            {todo.dueDate && (
              <span>Due: {todo.dueDate}</span>
            )}
          </div>

          <div className="todo-actions">
            <button
              type="button"
              onClick={() => {
                setEditTitle(todo.title);
                setIsEditing(true);
              }}
            >
              Edit
            </button>

            <button
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  </li>
);
}

export default memo(TodoItem);