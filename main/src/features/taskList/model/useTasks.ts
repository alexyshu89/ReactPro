import { useState, useMemo, useCallback, useEffect } from "react";

import type { Task } from "entities/task";
import { useGetTasksQuery } from "entities/task";

export type Filter = "all" | "completed" | "incomplete";

export function useTasks(): {
  tasks: Task[];
  filter: Filter;
  setFilter: (f: Filter) => void;
  removeTask: (id: string) => void;
} {
  const { data = [], isLoading } = useGetTasksQuery();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    if (!isLoading && data.length > 0) {
      setTasks(data);
    }
  }, [isLoading, data]);

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
