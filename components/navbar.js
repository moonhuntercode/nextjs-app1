// components/Navbar.js
"use client";

import Link from "next/link";
import styles from "../public/navbar.module.css";
import NotificationBell from "./NotificationBell";
import useAuthStore from "../stores/useAuthStore";
import logaso from "../assets/yo-serio-3.jpg";
export const Navbar = () => {
  const { isAdminLoggedIn, logoutAdmin } = useAuthStore();

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <img src={logaso.src} alt="Logo" className={styles.logoImage} />
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link href="/" className={styles.navLink}>
            Inicio 🏠
          </Link>
        </li>
        <li>
          <Link href="/admin" className={styles.navLink}>
            Admin 🔐
          </Link>
        </li>
        <li>
          <Link href="/consultas" className={styles.navLink}>
            Consultas 📊
          </Link>
        </li>
        <li>
          <NotificationBell className={styles.notificationBell} />
        </li>
        {isAdminLoggedIn && (
          <li className={styles.logoutButtonContainer}>
            <button onClick={logoutAdmin} className={styles.logoutButton}>
              Cerrar Sesión ❌
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
};
