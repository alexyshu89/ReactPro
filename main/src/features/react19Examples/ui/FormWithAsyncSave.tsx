import React, { useActionState, useEffect, useState } from "react";

import styles from "./FormWithAsyncSave.module.css";

const initialState = {
  success: false,
  message: "",
};

export const ActionForm: React.FC = () => {
  const [showSavedText, setShowSavedText] = useState(false);

  const submitAction = async (_: typeof initialState, formData: FormData) => {
    const textValue = formData.get("content") as string;
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Данные успешно сохранены:", textValue);

    return initialState;
  };

  const [state, formAction, isPending] = useActionState(
    submitAction,
    initialState,
  );

  useEffect(() => {
    if (!isPending && state === initialState) {
      setShowSavedText(true);
      const timer = setTimeout(() => setShowSavedText(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isPending, state]);

  const getButtonText = () => {
    if (isPending) return "Saving...";
    if (showSavedText) return "Saved!";
    return "Сохранить";
  };

  return (
    <form action={formAction} className={styles.fromWrap}>
      <label htmlFor="form-content-input" className={styles.label}>
        <span>Введите текст для сохранения</span>
        <input
          id="form-content-input"
          name="content"
          type="text"
          required
          disabled={isPending}
          placeholder="Начните писать..."
          style={{ backgroundColor: isPending ? "#f5f5f5" : "#fff" }}
          className={styles.field}
        />
      </label>

      <button
        type="submit"
        disabled={isPending}
        className={styles.btn}
        style={{
          backgroundColor: isPending
            ? "#6c757d"
            : showSavedText
              ? "#28a745"
              : "#007bff",
          cursor: isPending ? "not-allowed" : "pointer",
        }}
      >
        {getButtonText()}
      </button>
    </form>
  );
};
