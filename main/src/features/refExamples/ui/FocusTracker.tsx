import { useRef } from "react";

import styles from "./FocusTracker.module.css";

interface FocusData {
  clickCount: number;
}

export const FocusTracker: React.FC = () => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const secondInputRef = useRef<HTMLInputElement>(null);

  const ref = useRef<FocusData>({
    clickCount: 0,
  });

  const handleFocusFirst = () => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    const fromFirst = event.relatedTarget === firstInputRef.current;
    const fromSecond = event.relatedTarget === secondInputRef.current;

    if (event.relatedTarget && (fromFirst || fromSecond)) {
      ref.current.clickCount += 1;

      console.log(`FocusTracker: Переход фокуса зафиксирован!`);
      console.log(
        `FocusTracker: Количество фокус-переходов: ${ref.current.clickCount}`,
      );
    }
  };

  return (
    <div className={styles.wrap}>
      <h2>FocusTracker</h2>
      <input
        ref={firstInputRef}
        type="text"
        placeholder="Первое поле"
        onFocus={handleFocus}
        className={styles.field}
      />

      <input
        ref={secondInputRef}
        type="text"
        placeholder="Второе поле"
        onFocus={handleFocus}
        className={styles.field}
      />

      <button className={styles.btn} onClick={handleFocusFirst}>
        Сфокусировать на первом
      </button>

      <span className={styles.text}>
        (Статистика переходов пишется только в консоль)
      </span>
    </div>
  );
};

export default FocusTracker;
