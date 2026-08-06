export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface TaskCardProps {
  task: Task;
  onRemove(id: string): void;
}
