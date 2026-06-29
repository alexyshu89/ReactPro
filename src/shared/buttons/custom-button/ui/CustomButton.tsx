import type { CustomButtonProps } from "../model/types";
import styles from "./CustomButton.module.css";

export const CustomButton: React.FC<CustomButtonProps> = ({
  name,
  click,
  children,
}) => {
  return (
    <button className={styles.btn} onClick={click}>
      {name && <span>{name}</span>}
      {children}
    </button>
  );
};
