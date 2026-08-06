import { useNavigate } from "react-router-dom";

import { useAuth } from "features/authRouting";

import { useGetMeQuery } from "shared/api";

import styles from "./ProfilePage.module.css";

export const ProfilePage = () => {
  const { data, isLoading, isError } = useGetMeQuery();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    await navigate("/login", { replace: true });
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <h3>Загрузка профиля...</h3>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className={styles.error}>
        <h3>Ошибка</h3>
      </div>
    );
  }

  return (
    <div className={styles.wrap}>
      <div>
        <img alt="avatar" className={styles.pic} src={data.avatarPath} />
        <p>
          <strong>Имя пользователя:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>ID аккаунта:</strong> {data.id}
        </p>
      </div>

      <button onClick={handleLogout} className={styles.btn}>
        Выйти
      </button>
    </div>
  );
};
