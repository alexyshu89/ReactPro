import { NavLink } from "react-router-dom";

import styles from "./Header.module.css";

export const Header = () => {
  const navItems = [
    { to: "/tasks", label: "LESSONS - 1, 2, 3" },
    { to: "/forms", label: "LESSON - 4" },
    { to: "/use-ref", label: "LESSON - 5" },
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
      </div>
    </header>
  );
};
