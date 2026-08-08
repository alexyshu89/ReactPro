import { useState, useEffect } from "react";

interface DialogOptions {
  title: string;
  description: string;
}

interface DialogState extends DialogOptions {
  resolve: (value: boolean) => void;
}

let setDialogStateRef: React.Dispatch<
  React.SetStateAction<DialogState | null>
> | null = null;

export const showConfirmDialog = (options: DialogOptions): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    if (setDialogStateRef) {
      setDialogStateRef({
        ...options,
        resolve: (result: boolean) => {
          resolve(result);
          if (setDialogStateRef) setDialogStateRef(null); // Закрываем окно после выбора
        },
      });
    } else {
      console.warn("Компонент <ConfirmDialog /> не смонтирован в приложении.");
      resolve(false);
    }
  });
};

export const useConfirmDialogInternal = () => {
  const [state, setState] = useState<DialogState | null>(null);

  useEffect(() => {
    setDialogStateRef = setState;
    return () => {
      setDialogStateRef = null;
    };
  }, []);

  return state;
};
