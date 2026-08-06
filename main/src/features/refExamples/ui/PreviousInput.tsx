import React, { useState, useEffect, useRef } from "react";

import styles from "./PreviousInput.module.css";

export const PreviousInput: React.FC = () => {
  const [currentValue, setCurrentValue] = useState<string>("");
  const previousValueRef = useRef<string>("");

  useEffect(() => {
    previousValueRef.current = currentValue;
  }, [currentValue]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentValue(event.target.value);
  };

  return (
    <div className={styles.wrap}>
      <h2>PreviousInput</h2>
      <input
        className={styles.field}
        type="text"
        value={currentValue}
        onChange={handleChange}
        placeholder="Введите текст..."
      />
      <div className={styles.text}>
        Предыдущее значение: <strong>{previousValueRef.current}</strong>
      </div>
    </div>
  );
};

export default PreviousInput;
