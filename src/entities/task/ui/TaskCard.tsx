import { CompletedIcon, InCompletedIcon, TrashIcon } from "shared/icons";
import { CustomButton } from "shared/buttons/custom-button";
import type { TaskCardProps } from "../model/types";
import styles from "./TaskCard.module.css";

export function TaskCard({ task, onRemove }: TaskCardProps) {
  const { id, title, completed } = task;

  return (
    <div className={styles.card}>
      <p>{title}</p>
      <p>{completed ? <CompletedIcon /> : <InCompletedIcon />}</p>
      <div className={styles.btn}>
        <CustomButton click={() => onRemove(id)}>
          <TrashIcon />
        </CustomButton>
      </div>
    </div>
  );
}
