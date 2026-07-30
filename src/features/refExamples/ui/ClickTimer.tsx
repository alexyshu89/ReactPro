import { useRef } from "react";

import styles from "./ClickTimer.module.css";

interface ClickData {
  startTime: number | null;
  clickCount: number;
}

export const ClickTimer: React.FC = () => {
  const clickDataRef = useRef<ClickData>({ startTime: null, clickCount: 0 });

  const handleClick = () => {
    const now = Date.now();
    const clickData = clickDataRef.current;

    clickData.startTime ??= now;

    clickData.clickCount += 1;

    const timeDifference = now - clickData.startTime;

    console.log(`ClickTimer: Разница с первым кликом: ${timeDifference} мс`);
    console.log(`ClickTimer: Общее количество кликов: ${clickData.clickCount}`);
  };

  return (
    <div className={styles.wrap}>
      <h2>Click Timer</h2>
      <button className={styles.btn} onClick={handleClick}>
        Кликни меня
      </button>

      <p className={styles.text}>
        (Изменения отображаются только в консоли браузера)
      </p>
    </div>
  );
};
