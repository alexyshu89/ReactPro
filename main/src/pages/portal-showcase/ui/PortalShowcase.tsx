import { ConfirmDialog, showConfirmDialog } from "shared/confirm-dialog";
import { Tooltip, TooltipPosition } from "shared/tooltip";

import styles from "./PortalShowcase.module.css";

export const PortalShowcase = () => {
  const handleParentClick = () => {
    alert("Клик пойман на уровне родительского контейнера! Всплытие работает.");
  };

  const deleteItem = () => {
    alert("Элемент удален из базы данных.");
  };

  const handleDelete = async () => {
    const confirmed = await showConfirmDialog({
      title: "Удалить элемент?",
      description: "Это действие необратимо.",
    });

    if (confirmed) {
      deleteItem();
    }
  };

  return (
    <div className={styles.wrap}>
      <h2>Portal Page</h2>
      <h3>Задание 1</h3>
      <div className={styles.block}>
        <Tooltip content="Подсказка сверху" position={TooltipPosition.TOP}>
          <button className={styles.btn}>Наведи на меня (Top)</button>
        </Tooltip>
        <Tooltip content="Подсказка снизу" position={TooltipPosition.BOTTOM}>
          <button className={styles.btn}>Наведи на меня (Bottom)</button>
        </Tooltip>
      </div>
      <div className={styles.block}>
        <Tooltip content="Подсказка слева" position={TooltipPosition.LEFT}>
          <span style={{ borderBottom: "1px dashed" }}>
            Текст с подсказкой (Left)
          </span>
        </Tooltip>
        <Tooltip content="Подсказка справа" position={TooltipPosition.RIGHT}>
          <span style={{ borderBottom: "1px dashed" }}>
            Текст с подсказкой (Right)
          </span>
        </Tooltip>
      </div>

      <h3>Задание 2</h3>
      <button
        onClick={handleParentClick}
        className={styles.parent}
        type="button"
      >
        <span>Родительский контейнер (кликни здесь или по кнопке)</span>
        <Tooltip content="Я не мешаю кликам!" position={TooltipPosition.BOTTOM}>
          <span
            className={styles.btn}
            onClick={() => {
              alert("Клик по самой кнопке");
            }}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                alert("Клик по самой кнопке через клавиатуру");
              }
            }}
          >
            Наведи и кликни
          </span>
        </Tooltip>
      </button>

      <h3>Задание 3</h3>
      <div>
        <button className={styles.btn} onClick={handleDelete}>
          Удалить
        </button>
        <ConfirmDialog />
      </div>
    </div>
  );
};
