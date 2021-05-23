import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../static/images/header/logo.svg";

export const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.first_section}>
        <div>
          <NavLink to="/">
            <img src={logo} alt="nothing" />
          </NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.first}`}>
          <NavLink to="/topqueries">Топ запросов</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.second}`}>
          <NavLink to="/history">История</NavLink>
        </div>
        <div className={`${styles.group_links} ${styles.third}`}>
          <a href="#">Настройки</a>
        </div>
      </div>
      <div className={styles.second_section}>
        <NavLink to="/profile">Профиль</NavLink>
      </div>
    </div>
  );
};
