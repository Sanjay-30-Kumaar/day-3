interface TodoStatsProps {
  totalCount: number;
  completedCount: number;
}

function TodoStats({
  totalCount,
  completedCount,
}: TodoStatsProps) {
  return (
    <section aria-label="Todo statistics">
      <p>
        Total: {totalCount} | Completed: {completedCount}
      </p>
    </section>
  );
}

export default TodoStats;