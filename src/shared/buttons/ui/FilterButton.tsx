import type { FilterButtonProps } from "../model/types";

import styles from "./FilterButton.module.css";

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.filterBtn} ${isActive ? styles.activeBtn : ""}`}
    >
      {label}
    </button>
  );
};
