import type {
  PriorityFilter,
  SortOption,
  StatusFilter,
} from "../types/todo";

interface TodoFiltersProps {
  searchTerm: string;
  statusFilter: StatusFilter;
  priorityFilter: PriorityFilter;
  sortBy: SortOption;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: StatusFilter) => void;
  onPriorityChange: (value: PriorityFilter) => void;
  onSortChange: (value: SortOption) => void;
}

function TodoFilters({
  searchTerm,
  statusFilter,
  priorityFilter,
  sortBy,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: TodoFiltersProps) {
  return (
    <section aria-label="Todo filters">
      <div>
        <label htmlFor="todo-search">Search</label>

        <input
          id="todo-search"
          type="search"
          value={searchTerm}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search todos..."
        />
      </div>

      <div>
        <span>Status</span>

        <button
          type="button"
          aria-pressed={statusFilter === "all"}
          onClick={() => onStatusChange("all")}
        >
          All
        </button>

        <button
          type="button"
          aria-pressed={statusFilter === "active"}
          onClick={() => onStatusChange("active")}
        >
          Active
        </button>

        <button
          type="button"
          aria-pressed={statusFilter === "completed"}
          onClick={() => onStatusChange("completed")}
        >
          Completed
        </button>
      </div>

      <div>
        <label htmlFor="priority-filter">Priority</label>

        <select
          id="priority-filter"
          value={priorityFilter}
          onChange={(event) =>
            onPriorityChange(
              event.target.value as PriorityFilter,
            )
          }
        >
          <option value="all">All priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>

      <div>
        <label htmlFor="sort-todos">Sort by</label>

        <select
          id="sort-todos"
          value={sortBy}
          onChange={(event) =>
            onSortChange(event.target.value as SortOption)
          }
        >
          <option value="createdAt">Created date</option>
          <option value="priority">Priority</option>
          <option value="dueDate">Due date</option>
        </select>
      </div>
    </section>
  );
}

export default TodoFilters;