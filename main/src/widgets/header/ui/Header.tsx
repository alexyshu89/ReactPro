import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

export const Header = () => {
  const navItems = [
    { to: "/tasks", label: "TASKS (LESSONS - 1, 2, 3)" },
    { to: "/forms", label: "FORMS (LESSON - 4)" },
    { to: "/use-ref", label: "USE_REF (LESSON - 5)" },
    { to: "/profile", label: "PROFILE (LESSON - 6)" },
    { to: "/portal-showcase", label: "PORTAL(LESSON - 8)" },
  ];

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.nav}>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) => `
                ${styles.navLink} 
                ${isActive ? styles.active : ""}
              `}
            >
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className={styles.login}>
          <NavLink
            key="login"
            to={"/login"}
            className={({ isActive }) => `
                ${styles.navLink} 
                ${isActive ? styles.active : ""}
              `}
          >
            <span>"LOG IN (LESSON - 6)"</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
};
