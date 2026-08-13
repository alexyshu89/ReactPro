import { useActionState, startTransition } from "react";

import styles from "./ActionStateWithReducer.module.css";

interface FormState {
  status: "idle" | "submitting" | "success" | "error";
  message: string;
}

const initialState: FormState = {
  status: "idle",
  message: "",
};

export function ReducerForm() {
  const [state, formAction, isPending] = useActionState(
    async (_prevState: FormState, formData: FormData): Promise<FormState> => {
      const username = formData.get("username") as string;
      const email = formData.get("email") as string;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Данные отправлены:", { username, email });

      return {
        status: "success",
        message: `Пользователь ${username} успешно сохранен!`,
      };
    },
    initialState,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    startTransition(async () => {
      await formAction(formData);
      form.reset();
    });
  };

  return (
    <div>
      <h4>Регистрация</h4>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Имя"
          required
          disabled={isPending}
          className={styles.field}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          disabled={isPending}
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
          {isPending ? "Сохранение..." : "Отправить"}
        </button>
      </form>
      {state.status === "success" && (
        <p className={styles.success}>{state.message}</p>
      )}
    </div>
  );
}
