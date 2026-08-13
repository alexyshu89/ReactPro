import { useOptimistic, useActionState } from "react";

import styles from "./TodoListOptimistic.module.css";

interface Task {
  id: string;
  text: string;
}

export function TodoList() {
  const initialTasks: Task[] = [{ id: "1", text: "Изучить хук useOptimistic" }];

  const submitAction = async (_prevState: Task[], formData: FormData) => {
    const text = formData.get("content") as string;
    if (!text.trim()) return _prevState;

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newTask: Task = { id: Math.random().toString(), text };

    return [..._prevState, newTask];
  };

  const [tasks, formAction, isPending] = useActionState(
    submitAction,
    initialTasks,
  );

  const [optimisticTasks, setOptimisticTasks] = useOptimistic(
    tasks,
    (currentTasks, newTodoText: string) => [
      ...currentTasks,
      { id: "optimistic-id", text: `${newTodoText} (Сохранение...)` },
    ],
  );

  const clientAction = async (formData: FormData) => {
    const text = formData.get("content") as string;
    if (!text.trim()) return;

    setOptimisticTasks(text);
    await formAction(formData);
  };

  return (
    <div>
      <h4>Список задач</h4>
      <form action={clientAction} className={styles.form}>
        <input
          type="text"
          name="content"
          placeholder="Новая задача..."
          disabled={isPending}
          required
          className={styles.field}
        />
        <button
          type="submit"
          disabled={isPending}
          className={styles.btn}
          style={{
            backgroundColor: isPending ? "#6c757d" : "#007bff",
            cursor: isPending ? "not-allowed" : "pointer",
          }}
        >
          {isPending ? "Добавление..." : "Добавить"}
        </button>
      </form>
      <ul>
        {optimisticTasks.map((task) => (
          <li
            key={task.id}
            className={styles.item}
            style={{
              opacity: task.id === "optimistic-id" ? 0.5 : 1,
            }}
          >
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
