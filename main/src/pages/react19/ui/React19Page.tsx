import { ActionForm, ReducerForm, TodoList } from "features/react19Examples";

import styles from "./React19Page.module.css";

export const React19Page = () => {
  return (
    <div className={styles.wrap}>
      <h2>React Page</h2>
      <h3>Задание 1</h3>
      <ActionForm />
      <h3>Задание 2</h3>
      <TodoList />
      <h3>Задание 3</h3>
      <ReducerForm />
    </div>
  );
};
