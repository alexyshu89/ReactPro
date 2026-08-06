import type { Task } from "entities/task";

export interface TaskListProps {
  tasks: Task[];
  removeTask(id: string): void;
  filter: string;
  setFilter(type: string): void;
}
