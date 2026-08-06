import { useActionState } from "react";

import { initialFormState, submitFormAction } from "../model/form.actions";

import styles from "./NativeForm.module.css";

export const NativeForm = () => {
  const [state, formAction, isPending] = useActionState(
    submitFormAction,
    initialFormState,
  );

  return (
    <div className={styles.nf}>
      <h2>React 19 (useActionState)</h2>
      <div className={styles.wrap}>
        <h3>Регистрация</h3>

        <form action={formAction}>
          <div className={styles.formItem}>
            <label htmlFor="email">
              <span className={styles.fieldName}>Email:</span>
              <input
                className={styles.field}
                id="email"
                name="email"
                type="text"
                disabled={isPending}
                placeholder="example@mail.com"
              />
              {state.errors.email && (
                <span className={styles.errorMessage}>
                  {state.errors.email}
                </span>
              )}
            </label>
          </div>

          <div className={styles.formItemCheckbox}>
            <label
              htmlFor="confirmSubscription"
              className={styles.confirm}
              style={{
                cursor: isPending ? "not-allowed" : "pointer",
              }}
            >
              <input
                id="confirmSubscription"
                name="confirmSubscription"
                type="checkbox"
                disabled={isPending}
              />
              <span className={styles.checkboxLabel}>
                Подтверждаю подписку:
              </span>
            </label>
            {state.errors.confirmSubscription && (
              <span className={styles.errorMessage}>
                {state.errors.confirmSubscription}
              </span>
            )}
          </div>

          <button
            className={styles.submitBtn}
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Отправка..." : "Отправить данные"}
          </button>

          {state.message && (
            <div className={styles.message}>{state.message}</div>
          )}
        </form>
      </div>
    </div>
  );
};
