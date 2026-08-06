import { useState, useEffect, useRef } from "react";

import styles from "./DebouncedLogger.module.css";

export const DebouncedLogger: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      console.log(`Введенный текст: ${value}`);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <div className={styles.wrap}>
      <h2>DebouncedLogger</h2>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Печатайте здесь..."
        className={styles.field}
      />
      <p className={styles.text}>
        (Результат появится в консоли через 1 секунду после окончания ввода)
      </p>
    </div>
  );
};

export default DebouncedLogger;
