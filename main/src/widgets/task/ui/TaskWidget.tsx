import { TaskList, useTasks } from "features/taskList";

export function TaskWidget() {
  const { tasks, removeTask, filter, setFilter } = useTasks();

  return (
    <TaskList
      tasks={tasks}
      removeTask={removeTask}
      filter={filter}
      setFilter={setFilter}
    />
  );
}
