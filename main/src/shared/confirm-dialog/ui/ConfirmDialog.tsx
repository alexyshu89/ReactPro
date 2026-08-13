import React, { useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

import { useConfirmDialogInternal } from "../model/useConfirmDialog";

import styles from "./ConfirmDialog.module.css";

export const ConfirmDialog: React.FC = () => {
  const dialogState = useConfirmDialogInternal();
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(
    (result: boolean) => {
      if (dialogState) {
        dialogState.resolve(result);
      }
    },
    [dialogState],
  );

  useEffect(() => {
    if (!dialogState) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dialogState, handleClose]);

  if (!dialogState) return null;

  const { title, description } = dialogState;

  const tooltipRoot = document.getElementById("tooltip-root");
  if (!tooltipRoot) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dialogRef.current?.contains(e.target as Node)) {
      return;
    }
    handleClose(false);
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (dialogRef.current?.contains(e.target as Node)) {
      return;
    }
    if (e.key === "Enter" || e.key === " ") {
      handleClose(false);
    }
  };

  return createPortal(
    <div
      className={styles.wrap}
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      role="button"
      tabIndex={-1}
      aria-label="Закрыть диалоговое окно"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <h4 id="dialog-title" className={styles.title}>
          {title}
        </h4>
        <p id="dialog-description">{description}</p>

        <div className={styles.btnWrap}>
          <button onClick={() => handleClose(false)} className={styles.cancel}>
            Отмена
          </button>
          <button onClick={() => handleClose(true)} className={styles.confirm}>
            Подтвердить
          </button>
        </div>
      </div>
    </div>,
    tooltipRoot,
  );
};
