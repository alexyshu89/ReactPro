import { useState, useMemo, useCallback } from "react";

import type { Task } from "entities/task";

export type Filter = "all" | "completed" | "incomplete";

const initialTasks: Task[] = [
  { id: "1", title: "Task №1", completed: true },
  { id: "2", title: "Task №2", completed: true },
  { id: "3", title: "Task №3", completed: false },
  { id: "4", title: "Task №4", completed: false },
];

export function useTasks(): {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  removeTask: (id: string) => void;
} {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>("all");

  const removeTask = useCallback((id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }, []);

  const filteredTasks = useMemo(() => {
    switch (filter) {
      case "completed":
        return tasks.filter((task) => task.completed);
      case "incomplete":
        return tasks.filter((task) => !task.completed);
      case "all":
      default:
        return tasks;
    }
  }, [tasks, filter]);

  return {
    tasks: filteredTasks,
    filter,
    setFilter,
    removeTask,
  };
}
