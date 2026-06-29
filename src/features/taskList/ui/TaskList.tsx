import { TaskCard } from "entities/task/ui/TaskCard";
import { FilterButton } from "shared/buttons/filter-button";
import type { Filter } from "../model/useTasks";
import type { TaskListProps } from "../model/types";
import styles from "./TaskList.module.css";

const FILTER_CONFIG: { type: Filter; label: string }[] = [
  { type: "all", label: "Все" },
  { type: "completed", label: "Выполненные" },
  { type: "incomplete", label: "Активные" },
];

export function TaskList({
  tasks,
  removeTask,
  filter,
  setFilter,
}: TaskListProps) {
  return (
    <>
      <div className={styles.filters}>
        {FILTER_CONFIG.map(({ type, label }) => (
          <FilterButton
            key={type}
            label={label}
            isActive={filter === type}
            onClick={() => setFilter(type)}
          />
        ))}
      </div>

      <div className={styles.list}>
        {tasks.length === 0 ? (
          <p>Список задач пуст</p>
        ) : (
          tasks.map((task) => (
            <TaskCard key={task.id} task={task} onRemove={removeTask} />
          ))
        )}
      </div>
    </>
  );
}
